"use client";

import React, { createContext, useContext, useState } from "react";

interface ViewModeContextType {
  isATSMode: boolean;
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined,
);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [isATSMode, setIsATSMode] = useState(false);

  const toggleViewMode = () => {
    setIsATSMode((prev) => !prev);
  };

  return (
    <ViewModeContext.Provider value={{ isATSMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
