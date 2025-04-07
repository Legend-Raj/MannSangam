"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ArcheryChallengeProps {
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
}

export default function ArcheryChallenge({ difficulty, gameSpeed, onComplete }: ArcheryChallengeProps) {
  const [targets, setTargets] = useState([])
  const [arrowPosition, setArrowPosition] = useState({ x: 50, y: 80 })
  const [isAiming, setIsAiming] = useState(false)
  const [power, setPower] = useState(0)
  const [isPowerIncreasing, setIsPowerIncreasing] = useState(true)
  const [score, setScore] = useState(0)
  const [arrowsLeft, setArrowsLeft] = useState(5)
  const [gameOver, setGameOver] = useState(false)

  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Initialize game
  useEffect(() => {
    // Generate targets based on difficulty
    const newTargets = []
    const targetCount = 3 + difficulty

    for (let i = 0; i < targetCount; i++) {
      newTargets.push({
        x: 20 + Math.random() * 60, // Random position between 20-80%
        y: 20 + Math.random() * 40, // Random position between 20-60%
        size: 10 - difficulty, // Size decreases with difficulty
        hit: false,
      })
    }

    setTargets(newTargets)

    // Start game loop
    startGameLoop()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [difficulty])

  // Game loop
  const startGameLoop = () => {
    const loop = () => {
      drawGame()
      animationRef.current = requestAnimationFrame(loop)
    }

    loop()
  }

  // Draw game elements
  const drawGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#87CEEB" // Sky blue
    ctx.fillRect(0, 0, width, height)

    // Draw ground
    ctx.fillStyle = "#228B22" // Forest green
    ctx.fillRect(0, height * 0.9, width, height * 0.1)

    // Draw targets
    targets.forEach((target) => {
      ctx.fillStyle = target.hit ? "#888888" : "#FF0000" // Red or gray if hit
      ctx.beginPath()
      ctx.arc(width * (target.x / 100), height * (target.y / 100), width * (target.size / 100), 0, Math.PI * 2)
      ctx.fill()

      // Draw target rings
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(width * (target.x / 100), height * (target.y / 100), width * (target.size / 100) * 0.7, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(width * (target.x / 100), height * (target.y / 100), width * (target.size / 100) * 0.4, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Draw archer (Rama)
    ctx.fillStyle = "#0000FF" // Blue
    ctx.fillRect(width * (arrowPosition.x / 100) - 10, height * (arrowPosition.y / 100), 20, 40)

    // Draw bow
    ctx.strokeStyle = "#8B4513" // Brown
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(
      width * (arrowPosition.x / 100),
      height * (arrowPosition.y / 100) + 20,
      30,
      Math.PI * 0.25,
      Math.PI * 0.75,
      false,
    )
    ctx.stroke()

    // Draw arrow if aiming
    if (isAiming) {
      const arrowLength = power * 50

      ctx.strokeStyle = "#8B4513" // Brown
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * (arrowPosition.x / 100), height * (arrowPosition.y / 100) + 20)
      ctx.lineTo(width * (arrowPosition.x / 100) - arrowLength, height * (arrowPosition.y / 100) + 20)
      ctx.stroke()

      // Arrow head
      ctx.fillStyle = "#8B4513"
      ctx.beginPath()
      ctx.moveTo(width * (arrowPosition.x / 100) - arrowLength - 10, height * (arrowPosition.y / 100) + 20)
      ctx.lineTo(width * (arrowPosition.x / 100) - arrowLength, height * (arrowPosition.y / 100) + 15)
      ctx.lineTo(width * (arrowPosition.x / 100) - arrowLength, height * (arrowPosition.y / 100) + 25)
      ctx.fill()
    }
  }

  // Handle power meter
  useEffect(() => {
    if (!isAiming) return

    const powerInterval = setInterval(() => {
      if (isPowerIncreasing) {
        setPower((prev) => {
          if (prev >= 1) {
            setIsPowerIncreasing(false)
            return 1
          }
          return prev + 0.02
        })
      } else {
        setPower((prev) => {
          if (prev <= 0) {
            setIsPowerIncreasing(true)
            return 0
          }
          return prev - 0.02
        })
      }
    }, 30 / gameSpeed)

    return () => clearInterval(powerInterval)
  }, [isAiming, isPowerIncreasing, gameSpeed])

  // Start aiming
  const startAiming = () => {
    setIsAiming(true)
  }

  // Shoot arrow
  const shootArrow = () => {
    setIsAiming(false)
    setArrowsLeft(arrowsLeft - 1)

    // Check for hits
    const newTargets = [...targets]
    let hitCount = 0

    newTargets.forEach((target) => {
      if (!target.hit) {
        // Simple hit detection based on power
        // Higher power = more likely to hit targets higher up
        const targetHeight = target.y / 100
        const powerFactor = power * 0.8 // Scale power to make it more forgiving

        // Calculate hit probability based on power and target height
        // Lower targets are easier to hit with lower power
        const hitProbability = 1 - Math.abs(powerFactor - targetHeight)

        if (Math.random() < hitProbability * 0.7) {
          target.hit = true
          hitCount++
        }
      }
    })

    // Update score based on hits
    const newScore = score + hitCount * 20
    setScore(newScore)

    // Check if all targets are hit or no arrows left
    const allHit = newTargets.every((target) => target.hit)

    if (allHit || arrowsLeft <= 1) {
      setGameOver(true)
      setTimeout(() => {
        onComplete(newScore)
      }, 2000)
    }

    setTargets(newTargets)
    setPower(0)
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Forest Archery</h3>

      <div className="mb-4 flex justify-between w-full">
        <div className="text-xl">Score: {score}</div>
        <div className="text-xl">Arrows: {arrowsLeft}</div>
      </div>

      <div className="relative w-full h-[400px] mb-4 border rounded-lg overflow-hidden">
        <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />
      </div>

      {isAiming && (
        <div className="w-full mb-4">
          <p className="text-center mb-2">Power</p>
          <Progress value={power * 100} className="h-4" />
        </div>
      )}

      {!gameOver ? (
        isAiming ? (
          <Button size="lg" onClick={shootArrow}>
            Release Arrow
          </Button>
        ) : (
          <Button size="lg" onClick={startAiming} disabled={arrowsLeft <= 0}>
            Draw Bow
          </Button>
        )
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">Challenge Complete!</p>
          <p className="text-lg">Final Score: {score}</p>
        </div>
      )}
    </div>
  )
}

