"use client"
import { useEffect, useState } from "react"

export const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<
    Array<{
      id: number
      size: number
      left: string
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    // Generate initial meteors
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 2) + 1, // Size between 1-3px
      left: `${Math.floor(Math.random() * 95)}%`,
      duration: Math.random() * 2 + 1, // Duration between 1-3s
      delay: Math.random() * 3, // Delay between 0-3s
    }))

    setMeteors(newMeteors)

    // Regenerate meteors periodically
    const interval = setInterval(() => {
      setMeteors((prev) => {
        // Replace some meteors that have completed their animation
        const updatedMeteors = [...prev]
        const replaceCount = Math.floor(Math.random() * 5) + 3 // Replace 3-8 meteors at a time

        for (let i = 0; i < replaceCount; i++) {
          const indexToReplace = Math.floor(Math.random() * number)
          updatedMeteors[indexToReplace] = {
            id: prev[indexToReplace].id,
            size: Math.floor(Math.random() * 2) + 1,
            left: `${Math.floor(Math.random() * 95)}%`,
            duration: Math.random() * 2 + 1,
            delay: 0, // No delay for replacements
          }
        }

        return updatedMeteors
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [number])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <div
          key={`meteor-${meteor.id}`}
          className="absolute top-0 z-10"
          style={{
            left: meteor.left,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        >
          <div
            className="meteor-falling"
            style={{
              width: `${meteor.size}px`,
              height: `${meteor.size * 80}px`,
            }}
          >
            <div
              className="meteor-head"
              style={{
                width: `${meteor.size * 2}px`,
                height: `${meteor.size * 2}px`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
