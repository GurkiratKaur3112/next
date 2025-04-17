"use client"

import React, { type ReactNode, useState } from "react"

interface TabsProps {
  defaultValue?: string
  children: ReactNode
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || "")

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = "" }) => {
  return <div className={`flex rounded-lg bg-zinc-800/50 p-1 ${className}`}>{children}</div>
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  activeTab?: string
  setActiveTab?: (value: string) => void
  className?: string
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeTab,
  setActiveTab,
  className = "",
}) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all 
      ${
        activeTab === value
          ? "bg-cyan-900/70 text-cyan-300 shadow-glow"
          : "text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
      } 
      ${className}`}
      onClick={() => setActiveTab && setActiveTab(value)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: ReactNode
  activeTab?: string
  className?: string
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, activeTab, className = "" }) => {
  return activeTab === value ? <div className={`mt-2 rounded-md ${className}`}>{children}</div> : null
}
