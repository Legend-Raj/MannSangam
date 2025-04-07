"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface PatternGameProps {
  gameSpeed: number
  onScore: (score: number) => void
}

export default function PatternGame({ gameSpeed, onScore }: PatternGameProps) {
  const [patterns, setPatterns] = useState([])
  const [currentLevel, setCurrentLevel] = useState(1)
  const [userSequence, setUserSequence] = useState([])
  const [gameSequence, setGameSequence] = useState([])
  const [isShowingPattern, setIsShowingPattern] = useState(false)
  const [gameStatus, setGameStatus] = useState("ready") // ready, playing, success, failed
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  // Traditional Indian patterns
  const patternItems = [
    { id: 1, name: "Lotus", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Peacock", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Elephant", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Om", image: "/placeholder.svg?height=100&width=100" },
  ]

  // Initialize game
  useEffect(() => {
    setPatterns(patternItems)
    setLoading(false)
  }, [])

  // Start new game
  const startGame = () => {
    setCurrentLevel(1)
    setUserSequence([])
    setGameSequence([])
    setGameStatus("playing")
    setScore(0)
    generateSequence(1)
  }

  // Generate sequence for current level
  const generateSequence = (level) => {
    const newSequence = []
    for (let i = 0; i < level + 2; i++) {
      const randomIndex = Math.floor(Math.random() * patterns.length)
      newSequence.push(patterns[randomIndex].id)
    }
    setGameSequence(newSequence)
    showPattern(newSequence)
  }

  // Show pattern to user
  const showPattern = (sequence) => {
    setIsShowingPattern(true)
    setUserSequence([])

    // Show each item in sequence with delay
    sequence.forEach((patternId, index) => {
      setTimeout(
        () => {
          setUserSequence([patternId]) // Highlight current pattern

          // Clear highlight after a short delay
          setTimeout(() => {
            setUserSequence([])

            // If last item in sequence, allow user input
            if (index === sequence.length - 1) {
              setIsShowingPattern(false)
            }
          }, 500 / gameSpeed)
        },
        (index * 1000) / gameSpeed,
      )
    })
  }

  // Handle pattern click
  const handlePatternClick = (patternId) => {
    if (isShowingPattern || gameStatus !== "playing") {
      return
    }

    const newUserSequence = [...userSequence, patternId]
    setUserSequence(newUserSequence)

    // Check if user sequence matches game sequence so far
    const isCorrectSoFar = newUserSequence.every((id, index) => id === gameSequence[index])

    if (!isCorrectSoFar) {
      // User made a mistake
      setGameStatus("failed")
      onScore(score)
      return
    }

    // Check if user completed the sequence
    if (newUserSequence.length === gameSequence.length) {
      // Level completed
      const newScore = score + currentLevel * 10
      setScore(newScore)

      if (currentLevel === 5) {
        // Game completed
        setGameStatus("success")
        onScore(newScore)
      } else {
        // Next level
        const nextLevel = currentLevel + 1
        setCurrentLevel(nextLevel)
        setTimeout(() => {
          generateSequence(nextLevel)
        }, 1000)
      }
    }
  }

  // Get pattern highlight class
  const getPatternClass = (patternId) => {
    if (userSequence.includes(patternId)) {
      return "border-primary border-4 scale-105"
    }
    return ""
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-2xl mt-4">Loading Game...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-center">Pattern Recognition</h1>
      <p className="text-xl text-center">Remember and repeat the pattern</p>

      {gameStatus === "ready" && (
        <div className="text-center">
          <p className="text-lg mb-4">Watch the pattern carefully and repeat it in the same order.</p>
          <Button size="lg" onClick={startGame}>
            Start Game
          </Button>
        </div>
      )}

      {gameStatus === "playing" && (
        <>
          <div className="flex justify-between items-center w-full max-w-md">
            <div className="text-xl">Level: {currentLevel}</div>
            <div className="text-xl">Score: {score}</div>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            {patterns.map((pattern) => (
              <Card
                key={pattern.id}
                className={`cursor-pointer transition-all duration-300 ${getPatternClass(pattern.id)}`}
                onClick={() => handlePatternClick(pattern.id)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <img
                    src={pattern.image || "/placeholder.svg"}
                    alt={pattern.name}
                    className="w-20 h-20 object-contain"
                  />
                  <span className="text-center mt-2">{pattern.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {isShowingPattern && (
            <div className="text-xl font-medium text-center animate-pulse">Watch the pattern...</div>
          )}
        </>
      )}

      {gameStatus === "success" && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-xl">You completed all levels!</p>
          <p className="text-lg mt-2">Final Score: {score} points</p>
          <Button className="mt-4" onClick={startGame}>
            Play Again
          </Button>
        </div>
      )}

      {gameStatus === "failed" && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Pattern Incorrect</h2>
          <p className="text-xl">You made a mistake in the pattern.</p>
          <p className="text-lg mt-2">Final Score: {score} points</p>
          <Button className="mt-4" onClick={startGame}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

