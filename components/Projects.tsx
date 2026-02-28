"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { DATA } from "@/lib/data";

const projects = DATA.projects;

export function Projects() {
  return (
    <section className="py-24 max-w-2xl mx-auto px-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
        Selected Projects
      </h2>

      <div className="w-full">
        {/* Header Row - Hidden on mobile, visible on desktop */}
        <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_3fr_2fr_2fr] gap-4 pb-4 border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
          <div>Project</div>
          <div>When</div>
          <div>Description</div>
          <div>Tech</div>
          <div>Outcome</div>
        </div>

        <div className="space-y-6 md:space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:grid md:grid-cols-[2fr_1.5fr_3fr_2fr_2fr] gap-2 md:gap-4 py-4 border-b border-border/40 last:border-0 items-start md:items-baseline relative hover:bg-muted/30 -mx-4 px-4 rounded-xl transition-colors duration-300 ease-out"
            >
              <div className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600 group-hover:underline underline-offset-4 decoration-red-500/30 transition-all flex items-center gap-1"
                  >
                    {project.name}
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                ) : (
                  <span className="text-red-500">{project.name}</span>
                )}
              </div>

              <div className="text-xs text-muted-foreground font-mono md:text-xs">
                {project.year}
              </div>

              <div className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </div>

              <div className="text-xs text-muted-foreground font-mono leading-relaxed">
                {project.tech.join(", ")}
              </div>

              <div className="text-xs text-muted-foreground font-medium md:text-xs">
                {project.outcome}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
