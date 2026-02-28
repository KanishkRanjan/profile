"use client";

import { motion } from "framer-motion";
import { Clock } from "@/components/Clock";
import { LofiPlayer } from "@/components/LofiPlayer";
import Image from "next/image";

import { DATA } from "@/lib/data";

export function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 pt-32 pb-16 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative w-40 h-40 sm:w-56 sm:h-56 grayscale hover:grayscale-0 transition-all duration-500"
      >
        <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
          <Image
            src={DATA.hero.avatarUrl}
            alt={DATA.hero.name}
            fill
            className="object-cover object-top mask-image-gradient"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 tracking-tight">
          {DATA.hero.name}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mb-8 font-mono">
          <span>{DATA.hero.phonetic}</span>
          <span className="text-border">•</span>
          <span>{DATA.hero.title}</span>
          <span className="text-border">•</span>
          <Clock />
          <span className="text-border">•</span>
          <LofiPlayer />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.4,
            },
          },
        }}
        className="text-muted-foreground leading-relaxed max-w-xl mx-auto"
      >
        <ol className="space-y-4 text-base text-left list-decimal list-inside">
          {DATA.about.highlights.map((point, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 120, damping: 14 },
                },
              }}
              className="text-muted-foreground leading-relaxed transition-colors hover:text-foreground/90"
            >
              {point.split(/\*\*(.*?)\*\*/g).map((part, index) =>
                index % 2 === 1 ? (
                  <strong key={index} className="text-foreground font-semibold">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
