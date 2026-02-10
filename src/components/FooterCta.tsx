import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
];

const FooterCta = () => {
  const [copied, setCopied] = useState(false);
  const email = "contact@hoangtuan.dev"; // Thay bằng email thật của bạn

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-background pt-32 pb-10 overflow-hidden">
      {/* --- BACKGROUND TYPOGRAPHY DECOR --- */}
      {/* Chữ to mờ nằm dưới nền tạo chiều sâu */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none overflow-hidden">
        <h1 className="text-[15vw] font-black text-center text-primary/5 leading-none whitespace-nowrap opacity-50">
          HOANG TUAN
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-24">
          {/* --- LEFT: CTA HEADING --- */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Let’s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                legendary.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-md leading-relaxed"
            >
              Ready to turn complex ideas into high-performance software, I am
              always ready for new challenges.
            </motion.p>

            {/* ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full glow-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 transition-transform"
              >
                Contact with me <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>

              {/* COPY EMAIL BUTTON */}
              <button
                onClick={handleCopyEmail}
                className="h-14 px-8 rounded-full border border-border bg-secondary/20 hover:bg-secondary/50 text-foreground flex items-center gap-3 transition-all active:scale-95 group relative"
              >
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span className="font-medium">
                  {copied ? "Copied!" : "Copy Email"}
                </span>

                {/* Tooltip nhỏ báo email */}
                {!copied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border pointer-events-none">
                    {email}
                  </span>
                )}
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: NAVIGATION & SOCIALS --- */}
          <div className="flex flex-col justify-end lg:items-end space-y-10">
            {/* Quick Links Grid (Optional) */}
            <div className="grid grid-cols-2 gap-8 text-right w-full lg:w-auto">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-foreground">Navigation</h4>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Works
                </a>
                <a
                  href="#process"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Process
                </a>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-foreground">Services</h4>
                <span className="text-muted-foreground">Web Development</span>
                <span className="text-muted-foreground">Mobile Apps</span>
                <span className="text-muted-foreground">AI Solutions</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground text-xs">
              HT
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              © 2026 Hoang Tuan. All rights reserved.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 rounded-full border border-transparent hover:border-border hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCta;
