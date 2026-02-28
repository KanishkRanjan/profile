"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { DATA } from "@/lib/data";

const devBooks = DATA.library.dev;
const casualBooks = DATA.library.casual;

export function Library() {
  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Library
        </h2>

        {/* Dev Section */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
            Dev
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {devBooks.map((book, index) => (
              <motion.a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                key={book.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group block"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                    {book.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">
                  {book.author}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Casual Reads Section */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
            Casual Reads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {casualBooks.map((book, index) => (
              <motion.a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                key={book.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group block"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                    {book.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">
                  {book.author}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground italic">
            *and many more, these are just one of my best reads
          </p>
        </div>
      </div>
    </section>
  );
}
