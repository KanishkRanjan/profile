"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // eslint-disable-next-line
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const setDuration = (minutes: number) => {
    setIsActive(false);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-8 py-6 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col text-center md:text-left">
        <span className="text-5xl font-mono font-bold tracking-tight">
          {formatTime(timeLeft)}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Focus Session
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-muted/50 rounded-full p-1">
          <button
            onClick={() => setDuration(25)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${timeLeft === 25 * 60 && !isActive ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            25m
          </button>
          <button
            onClick={() => setDuration(5)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${timeLeft === 5 * 60 && !isActive ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            5m
          </button>
        </div>

        <button
          onClick={toggleTimer}
          className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label={isActive ? "Pause" : "Start"}
        >
          {isActive ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
