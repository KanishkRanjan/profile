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

export const DATA = {
  hero: {
    name: "Kanishk Ranjan",
    phonetic: "/kʌn-ɪʃk/",
    title: "noun",
    avatarUrl: "/me.png",
  },
  about: {
    intro:
      "I am a third-year Computer Science student at Newton School of Technology, Pune, working mostly on browser and desktop internals. I have patches merged into Chromium, Electron.js, and VS Code — usually the kind that take weeks of reading source code before the fix turns out to be six lines.",
    highlights: [
      "**Open Source Contributor @ElectronJS & Chromium — listed in the Chromium AUTHORS file | B.Tech AI/ML @ NST '28**",
    ],
    summary: [
      {
        title: "Systems Development",
        description: "Ship patches in codebases measured in tens of millions of lines — **Chromium**, **Electron.js**, and **VS Code** — where the work is locating the right six lines, not writing them.",
        icon: Terminal
      },
      {
        title: "Root-Cause Debugging",
        description: "Trace bugs to their origin instead of patching symptoms. A macOS text-selection bug came down to strict float equality on Retina coordinates; a DevTools bug to an emulation call running after the screenshot instead of before.",
        icon: Check
      },
      {
        title: "Cross-Language Range",
        description: "Follow one bug across **TypeScript**, **C++**, and **Objective-C** when that is what it takes, and work within each project's review culture — GitHub PRs for Electron, Gerrit and the Commit Queue for Chromium.",
        icon: Layers
      }
    ],
    philosophy:
      "The work I am proudest of looks small in the diff. A six-line Electron fix took months, most of it spent understanding why the obvious change was wrong. I would rather sit with a problem until I actually understand it than ship a workaround I cannot explain.",
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
      role: "Engineering Fellowship Intern",
      company: "Newton School",
      period: "Jul. 2026 – Present",
      location: "Pune, MH (On-site)",
      subtitle: "Selected as 1 of 3 Engineering Fellows among 18 interns",
      description: [
        "Shipping production features across three internal Newton School platforms as part of a selective on-campus engineering fellowship.",
        "Built the authentication layer for the NST Noticeboard — Auth.js with Google OAuth and credential sign-in, MongoDB-backed sessions — alongside a policy management dashboard with full CRUD and bulk Excel import.",
        "Implemented role-based access control, KPI evaluation, and email-based password reset for the Entrepreneurship Tracker, then containerized the service with Docker.",
        "Integrated the bliss graph-isomorphism algorithm to validate student-submitted ER diagrams, adding a lightweight pre-check that avoids invoking the heavy validator on malformed input.",
      ],
      tags: ["Next.js", "TypeScript", "Auth.js", "MongoDB", "Docker"],
    },
    {
      type: "Internship",
      role: "Software Development Intern",
      company: "Megahit",
      period: "Jan. 2026 – May 2026",
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
    {
      type: "Internship",
      role: "Intern",
      company: "Infosys",
      period: "Feb. 2025 – Apr. 2025",
      location: "Remote",
      description: [
        "Built an online auction platform supporting real-time bidding, with JWT-based authentication covering signup, login, password recovery, and session management.",
        "Implemented a WebSocket layer delivering instant bid updates and synchronized countdown timers across all connected clients.",
        "Developed a role-based admin dashboard for managing users, auctions, and disputes, and integrated payment settlement for auction winners.",
        "Hardened the application against SQL injection, XSS, and CSRF, and documented the technical architecture and deployment process.",
      ],
      tags: ["Node.js", "Angular", "MySQL", "WebSockets", "JWT"],
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
      role: "Contributor · #22 by commits (LF Insights, Aug 2026)",
      contributions: [
        {
          id: "PR #52581",
          icon: GitPullRequest,
          status: "open" as const,
          description: [
            "**fix: emit warnings for invalid headers in webRequest API**: Fixed silent header truncation when a `session.webRequest` listener returned a name or value containing invalid characters such as `\\r\\n`.",
            "The JS-to-`HttpResponseHeaders` conversion failed partway but its return value was ignored, applying a partially-built header set; `gin::Converter<net::HttpRequestHeaders>::FromV8` now returns `false` and the original headers are left untouched with a warning emitted (Fixes #52483).",
          ],
          link: "https://github.com/electron/electron/pull/52581",
        },
        {
          id: "PR #52519",
          icon: GitPullRequest,
          status: "open" as const,
          description: [
            "**fix: validate protocol scheme names in `RegisterSchemesAsPrivileged`**: Added validation of custom schemes passed to `protocol.registerSchemesAsPrivileged()`.",
            "Schemes are now checked before being registered and forwarded to child processes, preventing malformed values from propagating across the process boundary (Fixes #52484).",
          ],
          link: "https://github.com/electron/electron/pull/52519",
        },
        {
          id: "PR #52455",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**feat: support `restrictOwnAudio` constraint**: Fixed system audio looping back into screen shares when both audio-capture settings were enabled — `ElectronBrowserContext::DisplayMediaDeviceChosen` ignored `restrictOwnAudio` and always returned `loopback`.",
            "Now selects `kLoopbackWithoutChromeId` when `restrictOwnAudio` or `suppressLocalAudioPlayback` is requested on supported platforms, so `getDisplayMedia()` no longer includes local app playback (Fixes #52427).",
          ],
          link: "https://github.com/electron/electron/pull/52455",
        },
        {
          id: "PR #51155",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**fix: macOS menu roles missing Tahoe icons**: Resolved menu icons vanishing after a menu was opened for the first time on macOS Tahoe, which introduced system-provided icons for role-based menu items.",
            "Clearing `item.image` caused AppKit to drop the role's default icon; forced a refresh by reassigning the item's action selector, restoring correct rendering. Merged and backported to supported release lines (Fixes #50609).",
          ],
          link: "https://github.com/electron/electron/pull/51155",
        },
        {
          id: "PR #50261",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**test: add desktopCapturer window icon validation**: Introduced a new test suite to verify that window icons retrieved via desktopCapturer are both present and valid.",
            "Specifically designed to prevent regressions of issue #48063, ensuring that changes in Apple's internal implementation do not break icon retrieval logic.",
          ],
          link: "https://github.com/electron/electron/pull/50261",
        },
        {
          id: "PR #50188",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**fix: backport macOS Tahoe app icon retrieval**: Backported a critical fix from Chromium to resolve an issue where running application icons were not correctly retrieved on macOS Tahoe.",
            "Addresses internal Apple API changes by incorporating updated Chromium logic, ensuring consistent icon rendering across the latest macOS versions (Fixes #48063).",
          ],
          link: "https://github.com/electron/electron/pull/50188",
        },
        {
          id: "PR #49364",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**test: fix flaky BrowserWindow test**: Fixed flaky test cases in `BrowserWindow` where tests failed when the desktop theme was set to Dark.",
            "Identified that Chromium applies a #121212 background color in Dark mode, causing failures when loading `about:blank`, and implemented a robust fix to ensure consistent test pass rates.",
          ],
          link: "https://github.com/electron/electron/pull/49364",
        },
        {
          id: "PR #49356",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            '**feat: Developers tools for BaseWindow**: Fixed a critical "JavaScript error in main process" occurring when triggering `toggleDevTools` in `BaseWindow`.',
            "Updated the logic to target the currently focused `WebContents` using `webContents.getFocusedWebContents()` instead of `getOwnerBrowserWindow()`, handling edge cases where the DevTools window itself was focused.",
          ],
          link: "https://github.com/electron/electron/pull/49356",
        },
        {
          id: "PR #49316",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**test: fix flaky BrowserView test**: Resolved flaky tests in `BrowserView` caused by Chromium's dark mode background color inconsistencies.",
            "Ensured consistent test execution across different OS theme settings by addressing background rendering behaviors.",
          ],
          link: "https://github.com/electron/electron/pull/49316",
        },
        {
          id: "PR #49315",
          icon: GitPullRequest,
          status: "open" as const,
          description: [
            "**feat: ready-to-show event on webContents**: Added `paintWhenInitiallyHidden` option to the `WebContentsView` constructor.",
            'Enabled renderer "wake up" functionality to correctly fire `ready-to-show` and set initial `visibilityState` to hidden while in the background, addressing issue #43531.',
          ],
          link: "https://github.com/electron/electron/pull/49315",
        },
        {
          id: "PR #49219",
          icon: GitPullRequest,
          status: "closed" as const,
          description: [
            "**fix: resolve appIcon error in desktopCapturer**: Solved a high-DPI asset loss issue on macOS where window icons returned by `desktopCapturer` were low resolution (32x32).",
            "Created a local copy of window icon utility logic to enforce a target size of 128x128, ensuring Electron receives sharp icons without altering upstream Chromium files.",
          ],
          link: "https://github.com/electron/electron/pull/49219",
        },
        {
          id: "Website PR #962",
          icon: GitPullRequest,
          status: "merged" as const,
          description: [
            "**fix: replace wrong image address in apps page**: Noticed broken icon images for all non-featured apps on electronjs.org/apps and traced the cause to incorrect image link construction.",
            "Corrected the addresses, restoring icon rendering across the public app directory.",
          ],
          link: "https://github.com/electron/website/pull/962",
        },
      ],
    },
    {
      name: "The Chromium Project",
      role: "Open Source Developer · Listed in Chromium AUTHORS",
      contributions: [
        {
          id: "CL 7693757",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**[emulation] Fix viewport leakage when taking full page screenshots**: Fixed full-page screenshots breaking the DevTools frontend whenever the page was larger than the browser window — the UI bled into other panels and stayed broken until a resize or tab switch.",
            "Traced the root cause to `emulateDevice()` running *after* the capture, overriding the viewport with stale dimensions and never restoring it, leaving DevTools stuck with no cleanup path.",
            "Moved emulation ahead of the capture with correct device metrics and wrapped it in `try/finally` calling `emulateDevice(null)`, guaranteeing viewport restoration and removing a five-year-old block that had become a silent landmine.",
          ],
          link: "https://chromium-review.googlesource.com/q/7693757",
        },
        {
          id: "CL 7276941",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**[Mac][editing] Stop selecting word on right-click if caret is already placed**: Fixed right-clicking inside an input field silently selecting all nearby text on macOS, wiping existing content when users opened the context menu to paste at a specific position.",
            "Diagnosed a guard in Blink's `SelectionController` that compared caret and click positions with strict equality — Retina displays produce high-precision float coordinates, so a caret at 10 and a click at 10.0001 read as different positions and expanded the selection.",
            "Replaced the comparison with `IsEquivalent()` to normalize both positions and set a flag marking the caret as already placed, aligning behavior with Apple's native input guidelines.",
          ],
          link: "https://chromium-review.googlesource.com/q/7276941",
        },
        {
          id: "CL 7239386",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**Mac: Fix WebRTC window icon conversion via `gfx::Image`**: Replaced the WebRTC window picker's incorrect manual `NSImage`-to-`ImageSkia` conversion, which produced corrupted or blank window icons.",
            "Routed the conversion through `gfx::Image` behind the `kUseGfxImageForMacWindowIcons` flag, providing a reliable and standard conversion path (Bug 465028835).",
            "Superseded the earlier rasterization approach in CL 7206079, and was later backported into Electron as PR #50188, restoring running-application icon retrieval on macOS Tahoe.",
          ],
          link: "https://chromium-review.googlesource.com/q/7239386",
        },
        {
          id: "CL 7206079",
          icon: GitCommit,
          status: "merged" as const,
          description: [
            "**Mac: Force rasterization of window icons for WebRTC picker**: Fixed blank and corrupted icons in the WebRTC window picker caused by `NSRunningApplication` returning lazy or vector-backed image representations that failed to convert to `CGImage`.",
            "Explicitly drew each icon into a standardized 128x128 `NSBitmapImageRep`, forcing the OS to decode and rasterize immediately so a valid bitmap is always available to the UI.",
            "Landed on 8 Dec 2025 and was reverted the same day by Avi Drissman pending a tracked issue — a process gap, not a defect in the change (Bug 465028835).",
            "Reworked the fix as CL 7239386 three days later, which shipped and was subsequently backported into Electron.",
          ],
          link: "https://chromium-review.googlesource.com/q/7206079",
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
          link: "https://github.com/microsoft/vscode/pull/278931",
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
        "Held a consistent 60 FPS frame-update cycle by refreshing only the regions of the canvas that changed, keeping the UI responsive on low-spec lab machines.",
        "Structured the application as MVC so state changes stayed traceable as the feature set grew.",
        "Wrote custom event handling on the JavaFX canvas to support in-place answer editing and immediate scoring feedback.",
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
        "Issued per-student access credentials and enforced submission server-side when the timer expired, so a closed browser could not void an attempt.",
        "Automated student credentialing and result tracking, removing the manual paperwork instructors had been doing per test.",
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
        "Built a product view with price-range filtering and search that queried as the user typed.",
        "Built a secure, password-protected administrative dashboard for centralized product management, including full CRUD functionality for the product database.",
        "Built on Express, Node.js, and MongoDB with EJS server-side rendering.",
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
        "Designed the core system logic and user flow, and wrote the foundational codebase the final implementation was built on.",
        "Designed the backend architecture and complex scoring algorithms, including custom-engineered 'bonus question' mechanics to drive user engagement.",
        "Managed real-time backend monitoring and performance tuning during the live event, sustaining 144 contestants across 33 teams over 4.5 hours of continuous play.",
        "Turned the event brief into a technical spec and saw it through to the shipped platform.",
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
        "Ran it to spread backend work beyond the two or three people who had been absorbing all of it.",
        "Ran hands-on sessions taking students from frontend-only experience to writing and deploying their own endpoints.",
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
        "Designed and implemented a hybrid 'Phygital' gameplay loop across 8 levels for 46 competing teams, integrating secure user authentication with physical-world QR code location hints.",
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
        "Enforced competition rules across an 8-hour build session.",
        "Monitored teams' commit history through the event to verify the 'build from scratch' requirement held.",
        "Ruled on rule violations and disqualifications as the event's final arbiter.",
        "Audited codebases at intervals to catch pre-existing templates and unauthorized external assets.",
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
      value: "8+",
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
      value: "18",
      label: "Upstream Contributions",
      detail: "Electron, Chromium, VS Code — merged & in review",
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
