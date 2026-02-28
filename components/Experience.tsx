"use client";

import { motion } from "framer-motion";

import { DATA } from "@/lib/data";

const experiences = DATA.experience;

export function Experience() {
  return (
    <section className="px-6 py-24 max-w-2xl mx-auto">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
        Experience & Story
      </h2>

      <div className="relative border-l border-border/40 ml-3 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pl-8 relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-border group-hover:bg-foreground border border-background transition-colors duration-300" />

            {/* Content Container with Hover Effect */}
            <div className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
              <div className="flex flex-col mb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-foreground/80 font-medium">
                    {exp.location || exp.period}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="text-base text-muted-foreground">
                    {exp.company}
                  </span>
                  {exp.location && (
                    <span className="text-xs text-muted-foreground mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  )}
                </div>

                {/* Mentorship Highlight */}
                {exp.subtitle && (
                  <p className="text-sm text-primary font-medium italic mt-1">
                    {exp.subtitle}
                  </p>
                )}
              </div>

              <div className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-2 list-disc pl-4">
                    {exp.description.map((point, i) => (
                      <li
                        key={i}
                        className="pl-1 leading-relaxed transition-colors group-hover:text-foreground/90 duration-300"
                      >
                        {point.split(/\*\*(.*?)\*\*/g).map((part, index) =>
                          index % 2 === 1 ? (
                            <strong key={index} className="text-foreground">
                              {part}
                            </strong>
                          ) : (
                            part
                          ),
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{exp.description}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground font-medium transition-colors group-hover:bg-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
