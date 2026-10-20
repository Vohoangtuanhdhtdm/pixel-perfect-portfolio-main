import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import type { Diagram, DiagramNode } from "@/data/projects";

type ArchitectureDiagramProps = {
  diagram: Diagram;
  title: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

const NODE_H = 64;
// Narrower nodes in vertical mode keep phone diagrams close to natural size.
const nodeWidth = (vertical: boolean) => (vertical ? 140 : 168);
// Never shrink below this share of the natural width; the wrapper scrolls instead.
const MIN_SCALE = 0.75;

type Box = { x: number; y: number; w: number };

// Vertical orientation transposes the grid so wide diagrams stay legible on phones.
function layout(diagram: Diagram, vertical: boolean) {
  const w = nodeWidth(vertical);
  const gapX = vertical ? 12 : 56;
  const gapY = vertical ? 40 : 28;
  const cols = vertical ? diagram.rows : diagram.cols;
  const rows = vertical ? diagram.cols : diagram.rows;
  const boxes = new Map<string, Box>();
  diagram.nodes.forEach((n) => {
    const col = vertical ? n.row : n.col;
    const row = vertical ? n.col : n.row;
    boxes.set(n.id, { x: col * (w + gapX), y: row * (NODE_H + gapY), w: w });
  });
  return {
    boxes,
    width: cols * w + (cols - 1) * gapX,
    height: rows * NODE_H + (rows - 1) * gapY,
  };
}

function edgePath(a: Box, b: Box, vertical: boolean): string {
  const { w } = a;
  const sameCol = a.x === b.x;
  const sameRow = a.y === b.y;
  if (sameRow) {
    const y = a.y + NODE_H / 2;
    return b.x > a.x ? `M${a.x + w},${y} H${b.x}` : `M${a.x},${y} H${b.x + w}`;
  }
  if (sameCol) {
    const x = a.x + w / 2;
    return b.y > a.y ? `M${x},${a.y + NODE_H} V${b.y}` : `M${x},${a.y} V${b.y + NODE_H}`;
  }
  if (vertical) {
    const ax = a.x + w / 2;
    const bx = b.x + w / 2;
    const midY = (a.y + NODE_H + b.y) / 2;
    return `M${ax},${a.y + NODE_H} V${midY} H${bx} V${b.y}`;
  }
  const ay = a.y + NODE_H / 2;
  const by = b.y + NODE_H / 2;
  const midX = (a.x + w + b.x) / 2;
  return `M${a.x + w},${ay} H${midX} V${by} H${b.x}`;
}

type NodeProps = { node: DiagramNode; box: Box; animated: boolean; inView: boolean; delay: number };

const Node = ({ node, box, animated, inView, delay }: NodeProps) => {
  const { w } = box;
  return (
    <motion.g
      transform={`translate(${box.x},${box.y})`}
      initial={animated ? { opacity: 0 } : false}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        width={w}
        height={NODE_H}
        rx={6}
        className={node.highlight ? "fill-accent stroke-primary" : "fill-card stroke-foreground/20"}
        strokeWidth={node.highlight ? 1.5 : 1}
      />
      <text
        x={w / 2}
        y={node.sub ? NODE_H / 2 - 4 : NODE_H / 2 + 5}
        textAnchor="middle"
        className={`font-display text-[14px] font-semibold ${node.highlight ? "fill-primary" : "fill-foreground"}`}
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={w / 2}
          y={NODE_H / 2 + 15}
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[10.5px]"
        >
          {node.sub}
        </text>
      )}
    </motion.g>
  );
};

const ArchitectureDiagram = ({
  diagram,
  title,
  orientation = "horizontal",
  decorative = false,
}: ArchitectureDiagramProps) => {
  const markerId = `arrow-${useId().replace(/:/g, "")}`;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const animated = !useReducedMotion();
  const vertical = orientation === "vertical";
  const { boxes, width, height } = layout(diagram, vertical);
  const pad = 8;
  const viewWidth = width + pad * 2;
  // Nodes and edges appear in reading order: by column (or row when vertical).
  const step = (id: string) => {
    const n = diagram.nodes.find((node) => node.id === id)!;
    return (vertical ? n.row + n.col * 0.01 : n.col + n.row * 0.01) * 0.25;
  };

  return (
    <svg
      ref={ref}
      viewBox={`${-pad} ${-pad} ${viewWidth} ${height + pad * 2}`}
      width="100%"
      style={vertical ? { minWidth: viewWidth * MIN_SCALE } : undefined}
      className={`h-auto ${vertical ? "" : "max-w-full"}`}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": `${title} architecture diagram` })}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fill-foreground/50" />
        </marker>
      </defs>
      {diagram.edges.map(([from, to]) => (
        <motion.path
          key={`${from}-${to}`}
          data-edge
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: step(from) + 0.2, ease: "easeInOut" }}
          d={edgePath(boxes.get(from)!, boxes.get(to)!, vertical)}
          fill="none"
          className="stroke-foreground/40"
          strokeWidth={1.25}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {diagram.nodes.map((n) => (
        <Node key={n.id} node={n} box={boxes.get(n.id)!} animated={animated} inView={inView} delay={step(n.id)} />
      ))}
    </svg>
  );
};

export default ArchitectureDiagram;
