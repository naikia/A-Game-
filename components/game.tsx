"use client"

import { useEffect, useRef, useState } from "react"


const PLAYER_SIZE = 30
const PLAYER_SPEED = 5
const JUMP_FORCE = 12
const GRAVITY = 0.5
const PLATFORM_HEIGHT = 20
const PLATFORM_MIN_WIDTH = 100
const PLATFORM_MAX_WIDTH = 300
const PLATFORM_GAP_MIN = 100
const PLATFORM_GAP_MAX = 250


type Platform = {
  x: number
  y: number
  width: number
}

type Player = {
  x: number
  y: number
  velocityX: number
  velocityY: number
  isJumping: boolean
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showControls, setShowControls] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [player, setPlayer] = useState<Player>({
    x: 50,
    y: 100,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
  })

  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
  })


  const generatePlatforms = (canvasWidth: number, canvasHeight: number) => {
    const newPlatforms: Platform[] = []


    newPlatforms.push({
      x: 0,
      y: canvasHeight - 100,
      width: 200,
    })

    let lastX = 200
    let lastY = canvasHeight - 100


    for (let i = 0; i < 20; i++) {
      const width = Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH) + PLATFORM_MIN_WIDTH
      const gap = Math.random() * (PLATFORM_GAP_MAX - PLATFORM_GAP_MIN) + PLATFORM_GAP_MIN
      const heightDiff = Math.random() * 150 - 75 // Random height difference

      let y = lastY + heightDiff

      y = Math.max(200, Math.min(canvasHeight - 100, y))

      newPlatforms.push({
        x: lastX + gap,
        y,
        width,
      })

      lastX += gap + width
      lastY = y
    }


    newPlatforms.push({
      x: lastX + 200,
      y: lastY,
      width: 300,
    })

    return newPlatforms
  }

 
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return


    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    setPlatforms(generatePlatforms(canvas.width, canvas.height))


    setPlayer({
      x: 50,
      y: canvas.height - 150,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
    })


    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true)
        setShowControls(false)
      }

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setKeys((prev) => ({ ...prev, left: true }))
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setKeys((prev) => ({ ...prev, right: true }))
      }
      if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") && !player.isJumping) {
        setKeys((prev) => ({ ...prev, up: true }))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setKeys((prev) => ({ ...prev, left: false }))
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setKeys((prev) => ({ ...prev, right: false }))
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        setKeys((prev) => ({ ...prev, up: false }))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameStarted, player.isJumping])


  useEffect(() => {
    if (!gameStarted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const render = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height)


      let newVelocityX = player.velocityX
      let newVelocityY = player.velocityY
      let newX = player.x
      let newY = player.y
      let isJumping = player.isJumping


      if (keys.left) {
        newVelocityX = -PLAYER_SPEED
      } else if (keys.right) {
        newVelocityX = PLAYER_SPEED
      } else {
        newVelocityX = 0
      }


      newVelocityY += GRAVITY


      if (keys.up && !isJumping) {
        newVelocityY = -JUMP_FORCE
        isJumping = true
      }


      newX += newVelocityX
      newY += newVelocityY

      let onPlatform = false
      platforms.forEach((platform) => {

        if (
          newVelocityY > 0 &&
          player.y + PLAYER_SIZE <= platform.y &&
          newY + PLAYER_SIZE >= platform.y &&
          newX + PLAYER_SIZE > platform.x &&
          newX < platform.x + platform.width
        ) {
          newY = platform.y - PLAYER_SIZE
          newVelocityY = 0
          isJumping = false
          onPlatform = true
        }
      })

      if (!onPlatform && newY < canvas.height - PLAYER_SIZE) {
        isJumping = true
      }


      if (newX < 0) newX = 0
      if (newX + PLAYER_SIZE > canvas.width) newX = canvas.width - PLAYER_SIZE
      if (newY + PLAYER_SIZE > canvas.height) {
        newY = canvas.height - PLAYER_SIZE
        newVelocityY = 0
        isJumping = false
      }


      setPlayer({
        x: newX,
        y: newY,
        velocityX: newVelocityX,
        velocityY: newVelocityY,
        isJumping,
      })


      ctx.fillStyle = "#4CAF50"
      platforms.forEach((platform) => {
        ctx.fillRect(platform.x - window.scrollX, platform.y, platform.width, PLATFORM_HEIGHT)
      })


      ctx.fillStyle = "#FF5722"
      ctx.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE)


      if (player.x > canvas.width / 2) {
        window.scrollTo({
          left: player.x - canvas.width / 2,
          behavior: "auto",
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameStarted, player, platforms, keys])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 bg-sky-100" />

      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Game Controls</h2>
            <p className="mb-4">
              Use <span className="font-bold">WASD</span> or <span className="font-bold">Arrow Keys</span> to move
            </p>
            <p className="mb-6">
              Press <span className="font-bold">W</span>, <span className="font-bold">Up Arrow</span>, or{" "}
              <span className="font-bold">Space</span> to jump
            </p>
            <p className="text-sm text-gray-600 mb-4">Get to the end of the level by jumping across platforms</p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              onClick={() => {
                setGameStarted(true)
                setShowControls(false)
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
