"use client";

import {
  Github,
  Linkedin,
  Mail,
  Calendar,
  QrCode,
  Disc,
  User,
  Bot,
  X,
} from "lucide-react";
import { SiX } from "react-icons/si";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useViewMode } from "@/context/ViewModeContext";

export function FloatingNav() {
  const { isATSMode, toggleViewMode } = useViewMode();
  const [mounted, setMounted] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {showQR && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowQR(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm mx-4"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-3 -right-3 bg-white text-black hover:bg-gray-200 rounded-full shadow-lg border border-gray-200"
                onClick={() => setShowQR(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="bg-white p-2 rounded-xl">
                <QRCode
                  value={mounted ? window.location.href : ""}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <p className="text-center mt-6 text-sm font-medium text-black">
                Scan to share profile
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full border bg-background/70 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-primary/5"
        >
          <TooltipProvider>
            {/* View/Theme Switcher */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`flex items-center bg-neutral-300 dark:bg-neutral-800 rounded-full p-1 cursor-pointer w-14 h-8 transition-colors ${isATSMode ? "justify-end" : "justify-start"}`}
                  onClick={toggleViewMode}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-6 h-6 bg-background rounded-full shadow-sm flex items-center justify-center"
                  >
                    {isATSMode ? (
                      <Bot className="w-3 h-3 text-foreground" />
                    ) : (
                      <User className="w-3 h-3 text-foreground" />
                    )}
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {isATSMode
                  ? "Switch to Visual View"
                  : "Switch to ATS/Robot View"}
              </TooltipContent>
            </Tooltip>

            {/* QR Code */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowQR(true)}
                >
                  <QrCode className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Scan for info</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6" />

            {/* Social Icons */}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.about.connect.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Github className="w-5 h-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.about.connect.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.about.connect.x}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <SiX className="w-4 h-4" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>X/Twitter</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.about.connect.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Disc className="w-5 h-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Discord</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DATA.about.connect.cal}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Calendar className="w-5 h-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Schedule</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={DATA.about.connect.email}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="w-5 h-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Email</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </>
  );
}
