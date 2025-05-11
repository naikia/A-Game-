"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function LoadingScreen() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    setMounted(true)


    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    return () => clearTimeout(fadeTimer)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-1000",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="animate-pulse">
            <svg className="h-24 w-24" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask
                id="mask0_408_134"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="180"
                height="180"
              >
                <circle cx="90" cy="90" r="90" fill="black" />
              </mask>
              <g mask="url(#mask0_408_134)">
                <circle cx="90" cy="90" r="90" fill="black" />

                <path
                  d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="transparent"
                  className="animate-draw-path"
                />

                <path
                  d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                  fill="url(#paint0_linear_408_134)"
                  className="animate-fade-in-delayed"
                />
                <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_408_134"
                  x1="109"
                  y1="116.5"
                  x2="144.5"
                  y2="160.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_408_134"
                  x1="121"
                  y1="54"
                  x2="120.799"
                  y2="106.875"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>


          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-ping-slow opacity-20 rounded-full border-2 border-black"></div>
            <div className="absolute inset-[-15px] animate-ping-slower opacity-10 rounded-full border-2 border-black"></div>
          </div>
        </div>
        <div className="text-black text-center">
          <p className="text-lg mb-1 font-bold">The game is loading!</p>
          <p className="text-sm opacity-70">made with love by our Team</p>
        </div>
      </div>
    </div>
  )
}
