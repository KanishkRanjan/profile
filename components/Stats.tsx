"use client"

import { DATA } from "@/lib/data"
import { motion } from "framer-motion"

export function Stats() {
    return (
        <section className="py-24 px-6 w-full max-w-4xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12 text-center">
                Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {DATA.stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center space-y-2"
                    >
                        <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/50">
                            {stat.value}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                            {stat.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {stat.detail}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
