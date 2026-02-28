"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 border-none rounded-full p-1 cursor-pointer w-14 h-8 transition-colors ${isDark ? "justify-end" : "justify-start"
        }`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setTheme(isDark ? "light" : "dark")
        }
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-background rounded-full shadow-sm flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-foreground" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-orange-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
