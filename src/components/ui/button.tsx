import React from "react"
import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "link"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    const variantStyles = {
      default: "bg-cyan-600 text-white hover:bg-cyan-700",
      outline: "border border-cyan-700 text-cyan-400 hover:bg-cyan-900",
      link: "text-cyan-400 hover:text-cyan-300 underline",
    }
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
    }

    const classes = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)

    if (asChild) {
      // If asChild is true, render children directly (e.g. for Link)
      return React.cloneElement(React.Children.only(props.children) as React.ReactElement, {
        className: classes,
        ref,
        ...props,
      })
    }

    return <button className={classes} ref={ref} {...props} />
  }
)

Button.displayName = "Button"
