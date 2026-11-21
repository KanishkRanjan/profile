import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGooglecloud,
  SiVercel,
  SiGit,
  SiGithub,
  SiLinux,
  SiNginx,
  SiHuggingface,
  SiPytorch,
  SiPandas,
  SiShadcnui,
} from "react-icons/si";
import {
  Database,
  Code,
  Terminal,
  Coffee,
  FileCode,
  Box,
  Check,
  Layers,
  GraduationCap,
  GitPullRequest,
  GitCommit,
  Trophy,
  Keyboard,
} from "lucide-react";

// Fallback for Shadcn if package version is old
const ShadcnIcon =
  SiShadcnui ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((props: any) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2L2 22h20L12 2zm0 3.5L19.5 20H4.5L12 5.5z" />
    </svg>
  ));

// Merged contributions verified against GitHub on 21 November 2026.
export const ELECTRON_CONTRIBUTIONS = [
  {
    id: "PR #55057",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Preserve native macOS menu titles and icons**: Updated native menu state handling to preserve AppKit-managed titles and default icons on macOS Tahoe, including Settings and submenu icons, while still applying explicit changes from JavaScript."
    ],
    link: "https://github.com/electron/electron/pull/55057",
  },
  {
    id: "PR #52519",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Validate custom protocol scheme names**: Added RFC 3986 scheme-name validation to protocol.registerSchemesAsPrivileged() before custom schemes are registered or forwarded to child processes."
    ],
    link: "https://github.com/electron/electron/pull/52519",
  },
  {
    id: "PR #52455",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Support the restrictOwnAudio constraint**: Fixed display-media audio capture to honor restrictOwnAudio and suppressLocalAudioPlayback by selecting loopbackWithoutChrome on supported platforms, excluding local app playback."
    ],
    link: "https://github.com/electron/electron/pull/52455",
  },
  {
    id: "PR #51155",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Restore macOS Tahoe menu role icons**: Refreshed native menu actions to restore system-provided role icons after menus were reopened. Followed up in #55057 to also preserve submenu icons and AppKit-managed titles."
    ],
    link: "https://github.com/electron/electron/pull/51155",
  },
  {
    id: "PR #49356",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Fix Toggle Developer Tools for BaseWindow**: Fixed a main-process JavaScript error by targeting the focused WebContents when toggling DevTools, allowing the menu role to work with BaseWindow."
    ],
    link: "https://github.com/electron/electron/pull/49356",
  },
  {
    id: "PR #50261",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Add desktopCapturer icon regression tests**: Added tests that verify captured window icons are present and valid, guarding against regressions like the macOS Tahoe icon retrieval failure in #48063."
    ],
    link: "https://github.com/electron/electron/pull/50261",
  },
  {
    id: "PR #50188",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Backport the macOS Tahoe app icon fix**: Backported Chromium CL 7239386 into Electron to restore running application icon retrieval on macOS Tahoe, resolving #48063."
    ],
    link: "https://github.com/electron/electron/pull/50188",
  },
  {
    id: "PR #49364",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Stabilize BrowserWindow tests across desktop themes**: Fixed test failures caused by Chromium applying a dark background to about:blank when the desktop uses Dark mode."
    ],
    link: "https://github.com/electron/electron/pull/49364",
  },
  {
    id: "PR #49316",
    icon: GitPullRequest,
    status: "merged" as const,
    description: [
      "**Stabilize BrowserView tests across desktop themes**: Addressed theme-dependent background rendering in BrowserView tests so that Dark mode does not cause false failures."
    ],
    link: "https://github.com/electron/electron/pull/49316",
  },
];

export const ELECTRON_SUMMARY = {
  merged: ELECTRON_CONTRIBUTIONS.filter((pr) => pr.status === "merged").length,
  verifiedOn: "21 November 2026",
  sourceUrl: "https://github.com/electron/electron/pulls?q=is%3Apr+is%3Amerged+author%3AKanishkRanjan",
};

export const DATA = {
  hero: {
    name: "Kanishk Ranjan",
    phonetic: "/kʌn-ɪʃk/",
    title: "noun",
    avatarUrl: "/me.png",
  },
  about: {
    intro:
      "I am a Computer Science student at Newton School of Technology, Pune, and an open-source contributor to Electron, Chromium, and KDE Plasma. My merged work spans native desktop behavior, browser integration, screen sharing, and developer tools. I also build full-stack applications and cross-platform desktop software.",
    highlights: [
      "**Open Source Contributor · Electron, Chromium & KDE Plasma**",
      `${ELECTRON_SUMMARY.merged} merged Electron PRs spanning native macOS behavior, screen capture, protocol validation, and developer tools.`,
    ],
    summary: [
      {
        title: "Systems Development",
        description: "Contributed merged fixes to **Electron**, **Chromium**, and **KDE Plasma** across native desktop behavior, browser integration, screen sharing, and developer tools.",
        icon: Terminal
      },
      {
        title: "Regression Testing",
        description: "Added **desktopCapturer icon validation tests** and fixed theme-dependent **BrowserWindow** and **BrowserView** tests to prevent regressions and false failures.",
        icon: Check
      },
      {
        title: "Technical Agility",
        description: "Work across **C++/Qt**, native macOS code, **JavaScript**, and **TypeScript** to investigate platform behavior and carry fixes through upstream review.",
        icon: Layers
      }
    ],
    philosophy:
      "I believe that the best products are built by people who have a diverse range of interests. It's the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.",
    connect: {
      linkedin: "https://www.linkedin.com/in/kanishkranjan/",
      github: "https://github.com/KanishkRanjan",
      email: "mailto:kanishkranjan17@gmail.com",
      cal: "https://cal.com/kanishk-ranjan-chzi6x",
      x: "https://x.com/KanishkRanjan2",
      discord: "https://discord.com/users/kanishkranjan",
    },
  },
  experience: [
    {
      type: "Internship",
      role: "Software Development Intern",
      company: "Megahit",
      period: "Jan. 2026 – Present",
      location: "Berlin, Germany (Remote)",
      subtitle: "Mentored by Niklas Wenzel (Electron.js Maintainer)",
      referenceLink:
        "https://drive.google.com/file/d/1wG1a4J5Uc_DhChzIgf9V5C0I4ZwC2Mw4/view?usp=sharing",
      description: [
        "Engineered cross-platform features for Electron.js desktop applications, focusing on system-level integration and high-performance design patterns.",
        "Architected a safeStore mechanism for encrypted credential persistence and integrated a PostgreSQL layer for structured data management.",
        "Standardized Inter-Process Communication (IPC) using TypeScript Enums, eliminating runtime errors and ensuring type-safety across main/renderer processes.",
        "Automated development workflows using Webpack, ESLint, and Husky, reducing technical debt and enforcing code quality within an Agile sprint cycle.",
      ],
      tags: ["Electron.js", "TypeScript", "PostgreSQL", "Webpack"],
    },
  ],
  education: [
    {
      school: "Newton School of Technology",
      degree: "Bachelor of Technology in Computer Science",
      location: "Pune, MH",
      period: "Aug. 2024 – May 2028",
      icon: GraduationCap,
    },
    {
      school: "St. Karen’s High School",
      degree: "Senior Secondary (Class XII, CBSE)",
      location: "Patna, BR",
      period: "Aug. 2022 – May 2024",
      icon: GraduationCap,
    },
    {
      school: "Open Minds A Birla School",
      degree: "Matriculation (Class X, CBSE)",
      location: "Patna, BR",
      period: "Apr. 2021 – Apr. 2022",
      icon: GraduationCap,
    },
  ],
  openSource: [
    {
      name: "Electron.js",
      role: "Contributor",
      contributions: ELECTRON_CONTRIBUTIONS,
    },
    {
      name: "The Chromium Project",
      role: "Open Source Developer",
      contributions: [
        {
          id: "CL 7693757",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**Fix DevTools viewport leakage during full-page screenshots**: Fixed a screenshot flow that left DevTools with stale viewport dimensions, causing its UI to overlap other components after capturing pages larger than the browser window.",
            "Applied device emulation before capture and restored the viewport in a try/finally block, ensuring cleanup even if screenshot capture fails.",
          ],
          link: "https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/7693757",
        },
        {
          id: "CL 7239386",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**Fix WebRTC window icon conversion on macOS**: Replaced incorrect manual NSImage-to-ImageSkia conversion with gfx::Image to prevent blank or corrupted icons in the WebRTC window picker.",
            "Backported this upstream fix into Electron through PR #50188 to resolve desktopCapturer issue #48063.",
          ],
          link: "https://chromium-review.googlesource.com/c/chromium/src/+/7239386",
        },
        {
          id: "CL 7276941",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**Preserve the caret when right-clicking on macOS**: Updated Blink’s SelectionController to skip word selection when a right-click matches the existing caret position, preserving native macOS context-menu behavior.",
            "Prevented context-menu paste from unexpectedly replacing a whole word and added a regression test for right-clicking an existing caret.",
          ],
          link: "https://chromium-review.googlesource.com/c/chromium/src/+/7276941",
        },
      ],
    },
    {
      name: "KDE Plasma",
      role: "Contributor",
      contributions: [
        {
          id: "KGlobalAccelD MR !134",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**Fix Unicode handling in D-Bus object paths**: Fixed character truncation in KGlobalAccelD that allowed non-ASCII characters to pass ASCII validation and produce invalid component paths. Preserved the full Unicode value using char16_t.",
            "Extracted path sanitization into a testable helper and added regression coverage for ASCII, accented Latin, Polish, and CJK component names.",
          ],
          link: "https://invent.kde.org/plasma/kglobalacceld/-/merge_requests/134",
        },
        {
          id: "Plasma Browser Integration MR !210",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**Fix Microsoft Teams screen sharing with media controls enabled**: Replaced temporary DOM insertion of detached media players with event-based discovery, preventing the browser extension from disrupting Teams screen sharing.",
            "Passed detached audio and video elements to the content script through an event’s relatedTarget, preserving media-player detection without inserting or removing those elements from the page.",
          ],
          link: "https://invent.kde.org/plasma/plasma-browser-integration/-/merge_requests/210",
        },
        {
          id: "Plasma Browser Integration MR !211",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**Clarify native-host message callbacks**: Renamed addCallback to addPortCallback and callbacks to portCallbacks throughout the extension, distinguishing native-host port messages from runtime callbacks and resolving existing TODOs.",
          ],
          link: "https://invent.kde.org/plasma/plasma-browser-integration/-/merge_requests/211",
        },
      ],
    },
    {
      name: "Visual Studio Code",
      role: "Contributor",
      contributions: [
        {
          id: "PR #278931",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "Identified and resolved a race condition in the VS Code startup sequence where early extension activation triggered erratic UI scrolling behavior.",
            "Refined the Settings tree-view logic to ensure consistent scroll positioning, improving UX within the configuration interface.",
          ],
          link: "https://github.com/microsoft/vscode/pull/206899",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Quickka",
      year: "2026",
      description: "Real-time CTF & treasure hunt platform with live scoring",
      tech: ["JavaScript", "Express", "MongoDB", "Socket.io", "Docker"],
      outcome: "Deployed for college event",
      link: "https://github.com/KanishkRanjan/quickka",
    },
    {
      name: "BlueKa",
      year: "2025",
      description:
        "Cross-platform habit tracker with identity-based goal system",
      tech: ["React Native", "Expo", "TailwindCSS"],
      outcome: "Daily active use for 2+ months",
      link: "https://github.com/KanishkRanjan/BlueKa",
    },
    {
      name: "SplitBuddy",
      year: "2025",
      description:
        "Group expense and bill splitter with smart settlement logic",
      tech: ["React Native", "Expo", "Node.js", "Express", "Socket.io"],
      outcome: "Simplifies group expense management",
      link: "https://github.com/manthansubhash01/SplitBuddy",
    },
    {
      name: "Meowka",
      year: "2025",
      description: "Real-time vehicle tracking system with map visualization",
      tech: ["TypeScript", "React", "MongoDB"],
      outcome: "Demoed across departments",
      link: "https://github.com/KanishkRanjan/meowka",
    },
    {
      name: "FocusKa",
      year: "2025",
      description: "Distraction-blocking desktop app with session analytics",
      tech: ["Electron", "Vite"],
      outcome: "Boosted personal productivity",
      link: "https://github.com/KanishkRanjan/FocusKa",
    },
    {
      name: "WebKa",
      year: "2025",
      description: "Cloud-based collaborative text editor with real-time sync",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "Convex"],
      outcome: "Accessible from any device",
      link: "https://github.com/KanishkRanjan/wapka",
    },
    {
      name: "memoryKa",
      year: "2025",
      description: "Multiplayer memory card game with animated UI",
      tech: ["JavaScript", "React"],
      outcome: "Built for fun, polished for portfolio",
      link: "https://github.com/KanishkRanjan/memoryKa",
    },
    {
      name: "QuickSnatch 1.0",
      year: "2025",
      description: "Scalable treasure hunt platform for college fest",
      tech: ["Python", "Flask"],
      outcome: "Handled 300+ concurrent users",
      link: "https://github.com/KanishkRanjan/QuickSnatch",
    },
    {
      name: "CP Club Portal",
      year: "2024",
      description:
        "Full-stack portal with automated profile scraping for CP club",
      tech: ["MongoDB", "Express", "Web Scraping", "EJS"],
      outcome: "Adopted by club coordinators",
      link: "https://github.com/KanishkRanjan/competitive-programming-club",
    },
    {
      name: "CSESLB",
      year: "2024",
      description: "Automated leaderboard for CSES problem set rankings",
      tech: ["Puppeteer", "Express", "MongoDB"],
      outcome: "Used by 30+ students daily",
      link: "https://github.com/KanishkRanjan/cseslb",
    },
    {
      name: "Eatka",
      year: "2023",
      description: "WYSIWYG word processor for automated test paper generation",
      tech: ["Java", "JavaFX"],
      outcome: "Desktop app with rich text editing",
      link: "https://github.com/KanishkRanjan/Eatka",
    },
    {
      name: "Custom HTML Tags",
      year: "2021",
      description: "Experiment extending HTML with custom element registration",
      tech: ["HTML", "CSS", "JavaScript"],
      outcome: "Explored Web Components API",
      link: "https://github.com/KanishkRanjan/shiny-octo-bassoon",
    },
    {
      name: "TestKa",
      year: "2021",
      description: "Online examination system with auth & grading engine",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      outcome: "Full-stack app built at age 15",
      link: "https://github.com/KanishkRanjan/school",
    },
    {
      name: "ichigo-v4",
      year: "2020",
      description: "Remote system management tool via Windows Services",
      tech: ["C#", "Windows Services", "Express"],
      outcome: "Remote access from anywhere",
      link: "https://github.com/KanishkRanjan/ichigo-v4",
    },
    {
      name: "bookish-octo-potato",
      year: "2020",
      description: "E-commerce website with authentication & CRUD operations",
      tech: ["Node.js", "Express", "HTML", "CSS", "JavaScript", "EJS"],
      outcome: "Full-stack app built at age 15",
      link: "https://github.com/KanishkRanjan/bookish-octo-potato",
    },
    {
      name: "Blogka",
      year: "2020",
      description: "Full-stack blog with authentication & CRUD operations",
      tech: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
      outcome: "First auth system built",
    },
    {
      name: "ChatKa",
      year: "2020",
      description: "Real-time chat app with WebSocket communication",
      tech: ["Socket.io", "Node.js", "Express", "EJS"],
      outcome: "Learned real-time architecture",
    },
    {
      name: "HomeKa",
      year: "2020",
      description: "CLI tool to auto-sort homework files by subject",
      tech: ["Python", "Bash"],
      outcome: "Automated daily workflow",
    },
    {
      name: "Eins",
      year: "2018",
      description: "Voice-controlled personal assistant with task automation",
      tech: ["Python"],
      outcome: "Sparked the programming journey",
    },
    {
      name: "Quizka",
      year: "*",
      description: "Interactive terminal quiz game",
      tech: ["Bash"],
      outcome: "The very first program I wrote",
    },
  ],
  starProjects: [
    {
      name: "pfEatka (Perfect Easy Anytime Test)",
      role: "Lead Software Engineer",
      year: "2023",
      description: [
        "**High-performance desktop testing suite** built with Java and JavaFX, featuring a custom-rendered GUI designed for resource efficiency and low-latency interaction.",
        "Optimized rendering performance by implementing a consistent 60 FPS frame-update cycle and selective canvas refreshing, ensuring smooth UI transitions regardless of system load.",
        "Architected the application using a strict MVC (Model-View-Controller) design pattern to maintain separation of concerns and scalability in complex state management.",
        "Developed custom event-handling logic within the JavaFX canvas to support advanced user interactions and real-time assessment feedback.",
      ],
      tech: [
        "Java",
        "JavaFX",
        "MVC Architecture",
        "Desktop Optimization",
        "Custom GUI",
      ],
      link: "https://www.linkedin.com/posts/kanishkranjan_the-value-of-effort-and-resilience-shines-activity-7187714753358659584-TBgS",
    },
    {
      name: "TestKa",
      role: "Lead Developer & Architect",
      year: "2020",
      description: [
        "**End-to-end online assessment platform** featuring a dual-portal architecture for automated examination management and secure student evaluation.",
        "Developed a robust Teacher Dashboard with password-protected class management, enabling the creation of time-bound tests with dynamic question types (Subjective, MCQ, and Fill-in-the-Blanks).",
        "Implemented a secure, synchronized student testing environment with unique access credentials and automated server-side submission logic to ensure integrity when timers expire.",
        "Streamlined educational workflows by building automated performance monitoring and student credentialing systems, reducing administrative overhead for instructors.",
      ],
      tech: ["PHP", "JQuery", "MySQL", "Bootstrap", "JWT Auth"],
      link: "https://www.linkedin.com/posts/kanishkranjan_testka-edtech-onlineexams-activity-7228269237432115200-Xc2k",
    },
    {
      name: "Ecoka",
      role: "Full-Stack Developer",
      year: "2021",
      description: [
        "**Full-stack e-commerce price aggregator** designed to scrape and compare product pricing across multiple platforms to identify optimal deals.",
        "Engineered a responsive product showcase with advanced filtering capabilities, allowing users to set dynamic price ranges and execute real-time searches.",
        "Built a secure, password-protected administrative dashboard for centralized product management, including full CRUD functionality for the product database.",
        "Architected the application using a MERN-like stack (Express, Node.js, MongoDB) with EJS templating for server-side rendering and efficient data flow.",
      ],
      tech: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "JavaScript"],
      link: "https://www.linkedin.com/posts/kanishkranjan_webdevelopment-fullstack-techprojects-activity-7228267123389739009-Pkvx",
    },
  ],
  techStack: {
    languages: [
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C++", icon: SiCplusplus },
      { name: "C#", icon: Code },
      { name: "Java", icon: Coffee },
      { name: "PHP", icon: FileCode },
      { name: "SQL", icon: Database },
    ],
    frontend: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: ShadcnIcon },
      { name: "Electron.js", icon: Layers },
    ],
    backend: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
    infra: [
      { name: "Docker", icon: SiDocker },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Vercel", icon: SiVercel },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux", icon: SiLinux },
      { name: "Nginx", icon: SiNginx },
      { name: "Webpack", icon: Box },
      { name: "ESLint", icon: Check },
      { name: "Husky", icon: SiGit },
    ],
    ai: [
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Pandas", icon: SiPandas },
    ],
  },
  library: {
    dev: [
      {
        title: "Design and Analysis of Algorithms",
        author:
          "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
        link: "https://www.google.com/search?q=Introduction+to+Algorithms+CLRS",
      },
      {
        title: "Electron: From Beginner to Pro",
        author: "Chris Griffith and Leif Wells",
        link: "https://www.google.com/search?q=Electron+From+Beginner+to+Pro+Chris+Griffith",
      },
      {
        title: "Competitive Programmer's Handbook",
        author: "Antti Laaksonen",
        link: "https://www.google.com/search?q=Competitive+Programmer%27s+Handbook+Antti+Laaksonen",
      },
    ],
    casual: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        link: "https://www.google.com/search?q=Atomic+Habits+James+Clear",
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        link: "https://www.google.com/search?q=Deep+Work+Cal+Newport",
      },
      {
        title: "Moonwalking with Einstein",
        author: "Joshua Foer",
        link: "https://www.google.com/search?q=Moonwalking+with+Einstein+Joshua+Foer",
      },
      {
        title: "Hyperfocus",
        author: "Chris Bailey",
        link: "https://www.google.com/search?q=Hyperfocus+Chris+Bailey",
      },
      {
        title: "The 5AM Club",
        author: "Robin Sharma",
        link: "https://www.google.com/search?q=The+5AM+Club+Robin+Sharma",
      },
      {
        title: "Limitless",
        author: "Jim Kwik",
        link: "https://www.google.com/search?q=Limitless+Jim+Kwik",
      },
    ],
  },
  events: [
    {
      name: "PDF Security Research & Reverse Engineering",
      role: "Independent Security Researcher",
      date: "2022",
      location: "Remote",
      description: [
        "Reverse-engineered a 17,000-line obfuscated JavaScript file (a modified Firefox PDF.js viewer) to identify and re-enable restricted download functionality.",
        "Performed deep-dive source code analysis and diffing against original open-source repositories to bypass client-side security controls.",
        "Practiced responsible disclosure by reporting the vulnerability to the platform's founder, resulting in a system-wide patch and a reward of premium educational content.",
      ],
      tags: [
        "JavaScript",
        "Reverse Engineering",
        "Chrome DevTools",
        "Web Security",
        "Responsible Disclosure",
      ],
    },
    {
      name: "QuickSnatch 2.0 - Hybrid Coding & Treasure Hunt Platform",
      role: "Lead Platform Architect",
      date: "2026",
      location: "Newton School of Technology",
      description: [
        "Architected the core system logic and user flow for a high-concurrency competitive platform, providing the foundational codebase for the final implementation.",
        "Designed the backend architecture and complex scoring algorithms, including custom-engineered 'bonus question' mechanics to drive user engagement.",
        "Managed real-time backend monitoring and performance tuning during the live event to ensure system stability for 100+ concurrent participants.",
        "Translated high-level event requirements into a functional technical blueprint, overseeing the transition from design to final code execution.",
      ],
      tags: [
        "System Architecture",
        "Technical Design",
        "Logic Engineering",
        "Real-time Monitoring",
        "Backend Strategy",
      ],
    },
    {
      name: "Dev Club: Backend Development Intensive (Python/Flask)",
      role: "Technical Instructor",
      date: "2025",
      location: "Newton School of Technology",
      description: [
        "Led a specialized backend workshop during the semester break for the Dev Club, focusing on accelerating the team's proficiency in Python and the Flask framework.",
        "Curated a technical curriculum centered on RESTful API architecture and server-side logic to standardize the club's development stack for upcoming projects.",
        "Strategic initiative to upskill junior developers, effectively distributing the technical workload and reducing bottlenecks across the core development team.",
        "Facilitated hands-on sessions to bridge the gap between frontend concepts and dynamic backend implementation, ensuring production-ready code standards.",
      ],
      tags: [
        "Technical Mentorship",
        "Python / Flask",
        "Backend Architecture",
        "Team Scaling",
        "Curriculum Development",
      ],
    },
    {
      name: "QuickSnatch 1.0 - Hybrid CLI & Treasure Hunt Platform",
      role: "Lead Full-Stack Developer (Crisis Recovery)",
      date: "2024",
      location: "Newton School of Technology",
      description: [
        "Architected a CLI-based competitive platform inspired by Google CTF, engineered with a modular backend to support future transition to national-level competition scales.",
        "Executed a critical 12-hour overnight codebase recovery and system stabilization following a primary system failure, delivering a production-ready platform minutes before the event launch.",
        "Designed and implemented a hybrid 'Phygital' gameplay loop, integrating secure user authentication with physical-world QR code location hints.",
        "Optimized the user experience for high accessibility, ensuring first-year students could engage with complex technical challenges through an intuitive CLI interface.",
      ],
      tags: [
        "Crisis Management",
        "System Scalability",
        "Hybrid Systems",
        "Full-Stack Engineering",
        "CLI Interface Design",
      ],
    },
    {
      name: "Nirman - 8-Hour Full-Stack Web Development Hackathon",
      role: "Technical Invigilator",
      date: "2025",
      location: "Newton School of Technology",
      description: [
        "Enforced strict competition protocols and technical guidelines during an intensive 8-hour build session to maintain a high-integrity environment.",
        "Monitored real-time development workflows of participating teams, ensuring total adherence to the 'build from scratch' requirement.",
        "Exercised final authority over rule violations and disqualifications, serving as the primary arbiter for fair play and technical authenticity.",
        "Conducted periodic codebase audits throughout the event to verify that no pre-existing templates or unauthorized external assets were utilized.",
      ],
      tags: [
        "Technical Oversight",
        "Compliance Enforcement",
        "Competition Integrity",
        "Code Verification",
        "Policy Adherence",
      ],
    },
  ],
  stats: [
    {
      value: "7+",
      label: "Years Coding",
      detail: "Started at 13",
      icon: Terminal,
    },
    {
      value: "5x",
      label: "Rank 1 Streak",
      detail: "Consistent Top Performer in College Contest",
      icon: Trophy,
    },
    {
      value: String(ELECTRON_SUMMARY.merged),
      label: "Merged Electron PRs",
      detail: `Verified ${ELECTRON_SUMMARY.verifiedOn}`,
      icon: GitPullRequest,
    },
    {
      value: "740+",
      label: "Problems Solved",
      detail: "DSA & Competitive Programming",
      icon: Keyboard,
    },
  ],
};
