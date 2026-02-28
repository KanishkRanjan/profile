"use client"

import { motion } from "framer-motion"
import { CalendarDays } from "lucide-react"

import { DATA } from "@/lib/data"

const events = DATA.events

export function Events() {
    return (
        <section className="py-24 max-w-2xl mx-auto px-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Events & Talks
            </h2>

            <div className="space-y-16">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <div className="flex flex-col mb-2">
                            <h3 className="text-2xl font-bold text-foreground">{event.name}</h3>
                            <span className="text-muted-foreground font-medium">{event.role}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-6">
                            <span className="text-xs font-mono text-muted-foreground">{event.date}</span>
                            <span className="hidden sm:inline text-muted-foreground/30">·</span>
                            <span className="text-xs text-muted-foreground">{event.location}</span>
                        </div>

                        <ul className="space-y-3 mb-5">
                            {event.description.map((point, i) => (
                                <li key={i} className="text-muted-foreground text-sm leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-muted-foreground/50">
                                    {point.split(/\*\*(.*?)\*\*/g).map((part, idx) =>
                                        idx % 2 === 1 ? <strong key={idx} className="text-foreground font-semibold">{part}</strong> : part
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                            {event.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
