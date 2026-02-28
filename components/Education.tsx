"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { DATA } from "@/lib/data";

const education = DATA.education;

export function Education() {
  return (
    <section className="py-24 max-w-2xl mx-auto px-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
        Education
      </h2>

      <div className="space-y-8">
        {education.map((item, index) => (
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
            className="flex items-start gap-4"
          >
            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-semibold text-foreground">{item.school}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </div>
              </div>
              <p className="text-sm text-foreground/80 font-medium">
                {item.degree}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
