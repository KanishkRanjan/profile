import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewModeProvider } from "@/context/ViewModeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanishk Ranjan | Software Engineer & Builder",
  metadataBase: new URL("https://kanishkranjan.com"),
  description:
    "Portfolio of Kanishk Ranjan, a Software Engineer and B.Tech AI/ML student specializing in full-stack development, Electron.js, and open-source contributions. Discover projects, experience, and technical writing.",
  keywords: [
    "Kanishk Ranjan",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Electron.js Developer",
    "Open Source Contributor",
    "React Developer",
    "Next.js Developer",
    "Pune",
    "Newton School of Technology",
    "Web Development",
    "Portfolio",
  ],
  authors: [
    { name: "Kanishk Ranjan", url: "https://github.com/KanishkRanjan" },
  ],
  creator: "Kanishk Ranjan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kanishkranjan.com",
    title: "Kanishk Ranjan | Software Engineer & Builder",
    description:
      "Portfolio of Kanishk Ranjan, a Software Engineer and B.Tech AI/ML student specializing in full-stack development, Electron.js, and open-source contributions.",
    siteName: "Kanishk Ranjan Portfolio",
    images: [
      {
        url: "/me.png", // Reusing the avatar as an OG image for now. Ideally, a specific OG image should be created.
        width: 800,
        height: 800,
        alt: "Kanishk Ranjan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanishk Ranjan | Software Engineer & Builder",
    description:
      "Portfolio of Kanishk Ranjan, a Software Engineer and B.Tech AI/ML student specializing in full-stack development and open-source.",
    images: ["/me.png"],
    creator: "@KanishkRanjn", // Assuming twitter handle, update if incorrect based on contacts
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ViewModeProvider>
            <ThemeToggle />
            {children}
          </ViewModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
