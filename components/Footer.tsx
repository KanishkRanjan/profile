import { Pomodoro } from "@/components/Pomodoro";

export function Footer() {
  return (
    <footer className="py-24 px-6 max-w-2xl mx-auto flex flex-col gap-12">
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground italic">
          &quot;You&apos;ve reached the end! Or have you? Before you vanish into
          the digital void, I&apos;ve got a quick Pomodoro Timer to help you
          focus better on your next big thing (or just to remind you to stop
          doomscrolling).&quot;
        </p>
      </div>

      <Pomodoro />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kanishk Ranjan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
