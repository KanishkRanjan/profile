"use client";

import { motion } from "framer-motion";

import { DATA, ELECTRON_SUMMARY } from "@/lib/data";

const projects = DATA.openSource.map((project) => ({
  ...project,
  summary: "summary" in project ? project.summary : "",
  sourceUrl: "sourceUrl" in project ? project.sourceUrl : "",
}));

export function OpenSource() {
  return (
    <section className="py-24 max-w-2xl mx-auto px-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
        Open Source Contributions
      </h2>

      <div className="space-y-16">
        {projects.map((project, pIndex) => (
          <div key={pIndex} className="relative">
            <div className="flex flex-col mb-8">
              <h3 className="text-2xl font-bold text-foreground">
                {project.name}
              </h3>
              <span className="text-muted-foreground font-medium">
                {project.role}
              </span>
              {(project.name === "Electron.js" || project.summary || project.sourceUrl) && (
                <div className="mt-5 space-y-3">
                  {project.name === "Electron.js" && (
                    <p className="text-base text-foreground">
                      {ELECTRON_SUMMARY.merged} merged PRs
                    </p>
                  )}
                  {project.summary && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                  {project.sourceUrl && (
                    <p className="text-sm text-muted-foreground">
                      Verified {ELECTRON_SUMMARY.verifiedOn}.{" "}
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                        {project.name === "Electron.js" ? "View merged Electron PRs" : "View contributions"}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-12">
              {project.contributions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border-l-2 border-border/50 pl-6 hover:border-foreground/50 transition-colors duration-300"
                >
                  {/* Dot for timeline effect */}
                  <div className="absolute -left-[9px] top-0 h-4 w-4 bg-background border-2 border-muted-foreground rounded-full group-hover:border-foreground transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <item.icon className="w-3 h-3" />
                        {item.id}
                      </a>
                      {item.status && (
                        <span
                          className="text-sm font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500"
                        >
                          Merged
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {item.description.map((point, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-base leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/50"
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
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
