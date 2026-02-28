"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DATA } from "@/lib/data";

const fullStack = DATA.techStack;

const allTechs = [
  ...fullStack.languages,
  ...fullStack.frontend,
  ...fullStack.backend,
  ...fullStack.infra,
  ...fullStack.ai,
];

export function TechStack() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 max-w-2xl mx-auto space-y-12">
      <h3 className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-4">
        Technologies I Work With
      </h3>

      {/* Marquee View (Visible when NOT expanded) */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="relative flex w-full">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

              <div className="flex whitespace-nowrap scrolling-text">
                {[...allTechs, ...allTechs].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mx-8 text-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <tech.icon className="w-6 h-6" />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Grid View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            {/* Languages */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                Languages
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {fullStack.languages.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <tech.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                    Frontend
                  </h4>
                  <div className="space-y-4">
                    {fullStack.frontend.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <tech.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                    Backend & DB
                  </h4>
                  <div className="space-y-4">
                    {fullStack.backend.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <tech.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Infra & AI */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                    Infra & Tools
                  </h4>
                  <div className="space-y-4">
                    {fullStack.infra.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <tech.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                    AI & ML
                  </h4>
                  <div className="space-y-4">
                    {fullStack.ai.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <tech.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View Full Stack <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
