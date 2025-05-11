"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import StudioSplash from "@/components/studio-splash"
import Game from "@/components/game"

export default function Home() {
  const [gameState, setGameState] = useState<"loading" | "splash" | "game">("loading")

  useEffect(() => {

    const loadingTimer = setTimeout(() => {
      setGameState("splash")
    }, 3000)

    return () => clearTimeout(loadingTimer)
  }, [])


  const handleSplashComplete = () => {
    setGameState("game")
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      {gameState === "loading" && <LoadingScreen />}
      {gameState === "splash" && <StudioSplash onComplete={handleSplashComplete} />}
      {gameState === "game" && <Game />}
    </main>
  )
}
