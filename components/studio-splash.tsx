"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface StudioSplashProps {
  onComplete: () => void
}

export default function StudioSplash({ onComplete }: StudioSplashProps) {
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {

    setFadeIn(true)


    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)


    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-1000",
        !fadeIn ? "opacity-0" : fadeOut ? "opacity-0" : "opacity-100",
      )}
    >
      <h1 className="text-5xl font-bold text-white tracking-wider">Communication Studios</h1>
    </div>
  )
}
