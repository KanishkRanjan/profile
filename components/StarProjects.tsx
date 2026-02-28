"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

import { DATA } from "@/lib/data";

const starProjects = DATA.starProjects;

export function StarProjects() {
  return (
    <section className="py-24 max-w-2xl mx-auto px-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12 flex items-center gap-2">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        Star Projects
      </h2>

      <div className="space-y-16">
        {starProjects.map((project, pIndex) => (
          <motion.div
            key={pIndex}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: pIndex * 0.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative group p-4 -mx-4 rounded-2xl hover:bg-muted/30 transition-colors duration-300"
          >
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.name}
              </h3>
              <span className="text-muted-foreground font-medium">
                {project.role}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-muted-foreground">
                {project.year}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded transition-colors group-hover:bg-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <ul className="space-y-3">
              {project.description.map((point, i) => (
                <li
                  key={i}
                  className="text-muted-foreground text-sm leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/50 transition-colors group-hover:text-foreground/90 duration-300"
                >
                  {point.split(/\*\*(.*?)\*\*/g).map((part, index) =>
                    index % 2 === 1 ? (
                      <strong
                        key={index}
                        className="text-foreground font-semibold"
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    ),
                  )}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-red-500 hover:text-red-400 transition-all duration-300 group-hover:translate-x-1"
              >
                View Demo
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
