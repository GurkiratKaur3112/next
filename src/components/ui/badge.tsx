import React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "green" | "amber" | "red"
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", className = "", children, ...props }) => {
  let baseClasses = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border"

  let variantClasses = ""
  switch (variant) {
    case "green":
      variantClasses = "bg-green-400/20 border-green-400 text-green-400"
      break
    case "amber":
      variantClasses = "bg-amber-400/20 border-amber-400 text-amber-400"
      break
    case "red":
      variantClasses = "bg-red-400/20 border-red-400 text-red-400"
      break
    default:
      variantClasses = "bg-cyan-900/30 border-cyan-700/30 text-cyan-300"
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </span>
  )
}
