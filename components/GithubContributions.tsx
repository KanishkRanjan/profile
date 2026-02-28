"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

// Dynamically import GitHubCalendar with SSR disabled to prevent hydration errors
const GitHubCalendar = dynamic(() => import("react-github-calendar").then((mod) => mod.GitHubCalendar), {
    ssr: false,
    loading: () => <div className="h-[156px] w-full bg-muted/20 animate-pulse rounded-md" />,
})

export function GithubContributions() {
    const { theme } = useTheme()

    return (
        <section className="px-6 py-24 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12 text-center">
                GitHub Contributions
            </h2>

            <div className="w-full flex justify-center overflow-hidden">
                <GitHubCalendar
                    username="kanishkranjan"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                />
            </div>
        </section>
    )
}
