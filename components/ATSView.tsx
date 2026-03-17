"use client";

import { DATA } from "@/lib/data";
import { Clock } from "@/components/Clock";

export function ATSView() {
  return (
    <div className="font-mono text-sm leading-relaxed max-w-3xl mx-auto py-24 px-6 text-foreground whitespace-pre-wrap">
      {/* Header */}
      <div>{`# ${DATA.hero.name}`}</div>
      <div>
        {`/${DATA.hero.phonetic.replace(/\//g, "")}/ • ${DATA.hero.title} • `}
        <span className="inline-block">
          <Clock />
        </span>{" "}
        • [Lofi Music Player]
      </div>
      <br />
      <div>{`## About`}</div>
      <br />
      <div>{DATA.about.intro}</div>
      <br />
      {DATA.about.highlights.map((highlight, index) => (
        <div key={index}>{`- ${highlight.replace(/\*\*/g, "")}`}</div>
      ))}
      <br />
      
      {/* Professional Summary */}
      <div>{`## Professional Summary`}</div>
      <br />
      {DATA.about.summary.map((item, index) => (
        <div key={index}>
          <div>{`### ${item.title}`}</div>
          <div>{item.description}</div>
          <br />
        </div>
      ))}


      {/* Experience */}
      <div>{`## Experience`}</div>
      <br />
      {DATA.experience.map((exp, index) => (
        <div key={index}>
          <div>{`### ${exp.role} at **${exp.company}**`}</div>
          <div className="text-muted-foreground">{`[${exp.period}] | ${exp.location}`}</div>
          <br />
          {exp.description.map((desc, i) => (
            <div key={i}>{`- ${desc}`}</div>
          ))}
          <br />
          <div>{`*Tech Stack:* ${exp.tags.join(", ")}`}</div>
          <br />
        </div>
      ))}

      {/* Open Source */}
      <div>{`## Open Source Contributions`}</div>
      <br />
      {DATA.openSource.map((project, index) => (
        <div key={index}>
          <div>{`### ${project.name} (${project.role})`}</div>
          <br />
          {project.contributions.map((contrib, i) => (
            <div key={i}>
              <div>{`* [${contrib.id}](${contrib.link}) - ${contrib.status === "merged" ? "Merged" : contrib.status === "closed" ? "Closed" : "Open"}`}</div>
              {contrib.description.map((desc, j) => (
                <div
                  key={j}
                  className="pl-4"
                >{`- ${desc.replace(/\*\*/g, "")}`}</div>
              ))}
            </div>
          ))}
          <br />
        </div>
      ))}

      {/* Achievements */}
      <div>{`## Achievements`}</div>
      <br />
      {DATA.stats.map((stat, index) => (
        <div key={index}>
          <div>{`* **${stat.label}**: ${stat.value} (${stat.detail})`}</div>
        </div>
      ))}
      <br />

      {/* Projects */}
      <div>{`## Selected Projects`}</div>
      <br />
      {DATA.projects.map((project, index) => (
        <div key={index}>
          <div>{`### ${project.link ? `[${project.name}](${project.link})` : project.name} | ${project.year}`}</div>
          <div>{`- ${project.description}`}</div>
          <div>{`- *Tech:* ${project.tech.join(", ")}`}</div>
          {project.outcome && <div>{`- *Outcome:* ${project.outcome}`}</div>}
          <br />
        </div>
      ))}

      {/* Education */}
      <div>{`## Education`}</div>
      <br />
      {DATA.education.map((edu, index) => (
        <div key={index}>
          <div>{`### ${edu.school}`}</div>
          <div>{`* ${edu.degree}`}</div>
          <div>{`* ${edu.period} | ${edu.location}`}</div>
          <br />
        </div>
      ))}

      {/* Tech Stack */}
      <div>{`## Tech Stack`}</div>
      <br />
      <div>{`**Languages**: ${DATA.techStack.languages.map((t) => t.name).join(", ")}`}</div>
      <div>{`**Frontend**: ${DATA.techStack.frontend.map((t) => t.name).join(", ")}`}</div>
      <div>{`**Backend**: ${DATA.techStack.backend.map((t) => t.name).join(", ")}`}</div>
      <div>{`**Infra**: ${DATA.techStack.infra.map((t) => t.name).join(", ")}`}</div>
      <div>{`**AI/ML**: ${DATA.techStack.ai.map((t) => t.name).join(", ")}`}</div>
      <br />

      {/* Library */}
      <div>{`## Library (Reading List)`}</div>
      <br />
      <div>{`### Technical`}</div>
      {DATA.library.dev.map((book, index) => (
        <div
          key={index}
        >{`* [${book.title}](${book.link}) by ${book.author}`}</div>
      ))}
      <br />
      {/* Casual Library */}
      <div>{`### Casual`}</div>
      {DATA.library.casual.map((book, index) => (
        <div
          key={index}
        >{`- [${book.title}](${book.link}) by ${book.author}`}</div>
      ))}
      <br />

      {/* Footer / Contact */}
      <div className="border-t border-border mt-12 pt-6">
        <div>{`## Contact`}</div>
        <br />
        {DATA.about.connect.linkedin && (
          <div>{`- [LinkedIn](${DATA.about.connect.linkedin})`}</div>
        )}
        {DATA.about.connect.github && (
          <div>{`- [GitHub](${DATA.about.connect.github})`}</div>
        )}
        {DATA.about.connect.email && (
          <div>{`- [Email](${DATA.about.connect.email})`}</div>
        )}
        {DATA.about.connect.cal && (
          <div>{`- [Cal.com Schedule](${DATA.about.connect.cal})`}</div>
        )}
        {DATA.about.connect.x && (
          <div>{`- [X/Twitter](${DATA.about.connect.x})`}</div>
        )}
        {DATA.about.connect.discord && (
          <div>{`- [Discord](${DATA.about.connect.discord})`}</div>
        )}
      </div>
    </div>
  );
}
