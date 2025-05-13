// app/components/Tabs.tsx

"use client";

import React, { type ReactNode, useState, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";

// Tabs Context
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Tabs Main Wrapper
interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

// Tabs List
interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex rounded-lg p-1 bg-black/20 backdrop-blur-sm border border-cyan-800/30 ${className}`}>
      {children}
    </div>
  );
};

// Tabs Trigger (each button)
interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext);
  const ref = useRef<HTMLButtonElement>(null);

  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-md ${
        isActive ? "text-cyan-100" : "text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-900/20"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/30 rounded-md shadow-[0_0_10px_rgba(34,211,238,0.2)]"
          layoutId="tab-highlight"
          initial={false}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Tabs Content
interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return (
    <motion.div
      className={`tab-content mt-4 p-4 bg-black/10 rounded-lg border border-cyan-800/30 ${className}`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
