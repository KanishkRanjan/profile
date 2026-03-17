"use client"

import { Hero } from "@/components/Hero"
import { ProfessionalSummary } from "@/components/ProfessionalSummary"
import { Experience } from "@/components/Experience"
import { TechStack } from "@/components/TechStack"
import { Footer } from "@/components/Footer"
import { FloatingNav } from "@/components/FloatingNav"
import { Library } from "@/components/Library"
import { AboutMe } from "@/components/AboutMe"
import { OpenSource } from "@/components/OpenSource"
import { Projects } from "@/components/Projects"
import { StarProjects } from "@/components/StarProjects"
import { Education } from "@/components/Education"
import { Events } from "@/components/Events"
import { ATSView } from "@/components/ATSView"
import { useViewMode } from "@/context/ViewModeContext"

import { GithubContributions } from "@/components/GithubContributions"
import { Stats } from "@/components/Stats"

export default function Home() {
  const { isATSMode } = useViewMode()

  if (isATSMode) {
    return (
      <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <ATSView />
        <FloatingNav />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <ProfessionalSummary />
      <Experience />
      <OpenSource />
      <GithubContributions />
      <Stats />
      <StarProjects />
      <Events />
      <Projects />
      <Education />
      <TechStack />
      <Library />
      <AboutMe />
      <Footer />
      <FloatingNav />
    </main>
  )
}
