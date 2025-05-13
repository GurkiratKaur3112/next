import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full rounded-md border border-cyan-700/50 bg-black/60 px-3 py-2 text-cyan-100 placeholder:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
      {...props}
    />
  )
})

Input.displayName = "Input"
