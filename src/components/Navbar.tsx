import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { pickActiveSection } from "@/lib/activeSection";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["work", "research", "skills", "process", "faq", "contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const tops = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }));
      setActive(pickActiveSection(tops, window.innerHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4">
      <div
        className={`glass relative mx-auto flex h-14 max-w-4xl items-center justify-between overflow-hidden rounded-full pl-5 pr-2 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_18px_50px_-18px_rgb(30_50_90/0.35)]" : ""
        }`}
      >
        <a href="/" className="font-display text-[15px] font-bold tracking-tight">
          {profile.nameAscii}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="glass-inset absolute inset-0 rounded-full bg-white/70"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
          <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-primary ml-2 h-10 px-5 text-sm">
            CV
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="glass-inset grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-strong w-72 border-l-0">
            <SheetTitle className="eyebrow">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2 font-display text-3xl font-bold tracking-tight transition-colors hover:bg-white/60 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 justify-center">
                View CV
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        <motion.div
          data-testid="scroll-progress"
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full bg-primary/70"
        />
      </div>
    </header>
  );
};

export default Navbar;
