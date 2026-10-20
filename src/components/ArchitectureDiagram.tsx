import { useId } from "react";
import type { Diagram, DiagramNode } from "@/data/projects";

type ArchitectureDiagramProps = {
  diagram: Diagram;
  title: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

const NODE_W = 168;
const NODE_H = 64;

type Box = { x: number; y: number };

// Vertical orientation transposes the grid so wide diagrams stay legible on phones.
function layout(diagram: Diagram, vertical: boolean) {
  const gapX = vertical ? 24 : 56;
  const gapY = vertical ? 40 : 28;
  const cols = vertical ? diagram.rows : diagram.cols;
  const rows = vertical ? diagram.cols : diagram.rows;
  const boxes = new Map<string, Box>();
  diagram.nodes.forEach((n) => {
    const col = vertical ? n.row : n.col;
    const row = vertical ? n.col : n.row;
    boxes.set(n.id, { x: col * (NODE_W + gapX), y: row * (NODE_H + gapY) });
  });
  return {
    boxes,
    width: cols * NODE_W + (cols - 1) * gapX,
    height: rows * NODE_H + (rows - 1) * gapY,
  };
}

function edgePath(a: Box, b: Box, vertical: boolean): string {
  const sameCol = a.x === b.x;
  const sameRow = a.y === b.y;
  if (sameRow) {
    const y = a.y + NODE_H / 2;
    return b.x > a.x ? `M${a.x + NODE_W},${y} H${b.x}` : `M${a.x},${y} H${b.x + NODE_W}`;
  }
  if (sameCol) {
    const x = a.x + NODE_W / 2;
    return b.y > a.y ? `M${x},${a.y + NODE_H} V${b.y}` : `M${x},${a.y} V${b.y + NODE_H}`;
  }
  if (vertical) {
    const ax = a.x + NODE_W / 2;
    const bx = b.x + NODE_W / 2;
    const midY = (a.y + NODE_H + b.y) / 2;
    return `M${ax},${a.y + NODE_H} V${midY} H${bx} V${b.y}`;
  }
  const ay = a.y + NODE_H / 2;
  const by = b.y + NODE_H / 2;
  const midX = (a.x + NODE_W + b.x) / 2;
  return `M${a.x + NODE_W},${ay} H${midX} V${by} H${b.x}`;
}

const Node = ({ node, box }: { node: DiagramNode; box: Box }) => (
  <g transform={`translate(${box.x},${box.y})`}>
    <rect
      width={NODE_W}
      height={NODE_H}
      rx={6}
      className={node.highlight ? "fill-accent stroke-primary" : "fill-card stroke-foreground/20"}
      strokeWidth={node.highlight ? 1.5 : 1}
    />
    <text
      x={NODE_W / 2}
      y={node.sub ? NODE_H / 2 - 4 : NODE_H / 2 + 5}
      textAnchor="middle"
      className={`font-display text-[14px] font-semibold ${node.highlight ? "fill-primary" : "fill-foreground"}`}
    >
      {node.label}
    </text>
    {node.sub && (
      <text
        x={NODE_W / 2}
        y={NODE_H / 2 + 15}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[10.5px]"
      >
        {node.sub}
      </text>
    )}
  </g>
);

const ArchitectureDiagram = ({
  diagram,
  title,
  orientation = "horizontal",
  decorative = false,
}: ArchitectureDiagramProps) => {
  const markerId = `arrow-${useId().replace(/:/g, "")}`;
  const vertical = orientation === "vertical";
  const { boxes, width, height } = layout(diagram, vertical);
  const pad = 8;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
      width="100%"
      className="h-auto max-w-full"
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": `${title} architecture diagram` })}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-foreground/50" />
        </marker>
      </defs>
      {diagram.edges.map(([from, to]) => (
        <path
          key={`${from}-${to}`}
          data-edge
          d={edgePath(boxes.get(from)!, boxes.get(to)!, vertical)}
          fill="none"
          className="stroke-foreground/40"
          strokeWidth={1.25}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {diagram.nodes.map((n) => (
        <Node key={n.id} node={n} box={boxes.get(n.id)!} />
      ))}
    </svg>
  );
};

export default ArchitectureDiagram;
