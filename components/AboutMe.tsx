"use client";

import { DATA } from "@/lib/data";

export function AboutMe() {
  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Thing About Me
          </h2>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {DATA.about.intro}
          </p>
        </div>

        {/* Second Paragraph */}
        <p className="text-muted-foreground leading-relaxed text-lg">
          {DATA.about.philosophy}
        </p>

        {/* Get in Touch */}
        <div className="pt-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Get In Touch
          </h2>
          <p className="text-xl text-foreground">
            Connect with me on{" "}
            <a
              href={DATA.about.connect.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              LinkedIn
            </a>{" "}
            or shoot an{" "}
            <a
              href={DATA.about.connect.email}
              className="underline decoration-1 underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              email
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
