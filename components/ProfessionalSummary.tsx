"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";

export function ProfessionalSummary() {
  return (
    <section className="px-6 pb-24 pt-8 max-w-2xl mx-auto">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
        Professional Summary
      </h2>

      <div className="text-muted-foreground mb-4 leading-relaxed text-base">
        <ul className="space-y-4 list-disc pl-4">
          {DATA.about.summary.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pl-2 leading-relaxed transition-colors hover:text-foreground/90 duration-300"
            >
              <strong className="text-foreground font-semibold">
                {item.title}:
              </strong>{" "}
              {item.description}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
