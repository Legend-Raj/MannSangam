"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface BridgeChallengeProps {
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
}

export default function BridgeChallenge({ difficulty, gameSpeed, onComplete }: BridgeChallengeProps) {
  const [stones, setStones] = useState([])
  const [pattern, setPattern] = useState([])
  const [selectedStones, setSelectedStones] = useState([])
  const [showingPattern, setShowingPattern] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true)

  // Stone types
  const stoneTypes = [
    { id: 1, name: "Round", image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Square", image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Triangle", image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Diamond", image: "/placeholder.svg?height=80&width=80" },
  ]

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [difficulty])

  const initializeGame = () => {
    setLoading(true)

    // Generate pattern based on difficulty
    const patternLength = 3 + difficulty
    const newPattern = []

    for (let i = 0; i < patternLength; i++) {
      const randomStoneType = stoneTypes[Math.floor(Math.random() * stoneTypes.length)]
      newPattern.push(randomStoneType.id)
    }

    setPattern(newPattern)

    // Generate available stones (all types, multiple of each)
    const availableStones = []
    stoneTypes.forEach((type) => {
      for (let i = 0; i < 3; i++) {
        availableStones.push({
          ...type,
          uniqueId: `${type.id}-${i}`,
        })
      }
    })

    setStones(availableStones)
    setSelectedStones([])
    setAttempts(0)
    setScore(0)
    setGameOver(false)

    // Show pattern briefly
    setShowingPattern(true)
    setTimeout(() => {
      setShowingPattern(false)
      setLoading(false)
    }, 3000 / gameSpeed)
  }

  // Handle stone selection
  const handleStoneClick = (stone) => {
    if (showingPattern || gameOver) return

    // Add stone to selected stones
    const newSelectedStones = [...selectedStones, stone.id]
    setSelectedStones(newSelectedStones)

    // Check if pattern is complete
    if (newSelectedStones.length === pattern.length) {
      checkPattern(newSelectedStones)
    }
  }

  // Check if pattern matches
  const checkPattern = (selectedPattern) => {
    const isCorrect = pattern.every((stoneId, index) => stoneId === selectedPattern[index])

    setAttempts(attempts + 1)

    if (isCorrect) {
      // Pattern is correct
      const attemptScore = Math.max(100 - attempts * 10, 50)
      const difficultyBonus = difficulty * 20
      const newScore = attemptScore + difficultyBonus

      setScore(newScore)
      setGameOver(true)

      setTimeout(() => {
        onComplete(newScore)
      }, 2000)
    } else {
      // Pattern is incorrect
      setSelectedStones([])

      // Show pattern again briefly
      setShowingPattern(true)
      setTimeout(() => {
        setShowingPattern(false)
      }, 2000 / gameSpeed)
    }
  }

  // Show hint
  const showHint = () => {
    setShowingPattern(true)
    setTimeout(() => {
      setShowingPattern(false)
    }, 2000 / gameSpeed)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Preparing the stones...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Bridge Building</h3>
      <p className="text-lg mb-4">Arrange the stones in the correct pattern to build the bridge to Lanka</p>

      <div className="mb-4 flex justify-between w-full">
        <div className="text-xl">Attempts: {attempts}</div>
        {!showingPattern && !gameOver && (
          <Button variant="outline" onClick={showHint}>
            Show Hint
          </Button>
        )}
      </div>

      {/* Pattern display */}
      <div className="w-full mb-6">
        <h4 className="text-xl mb-2">{showingPattern ? "Remember this pattern:" : "Your selection:"}</h4>

        <div className="flex justify-center gap-2 p-4 bg-primary/10 rounded-lg min-h-[100px] items-center">
          {showingPattern ? (
            pattern.map((stoneId, index) => {
              const stone = stoneTypes.find((s) => s.id === stoneId)
              return (
                <Card key={index} className="w-20 h-20 flex items-center justify-center">
                  <CardContent className="p-2">
                    <img
                      src={stone.image || "/placeholder.svg"}
                      alt={stone.name}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              )
            })
          ) : selectedStones.length > 0 ? (
            selectedStones.map((stoneId, index) => {
              const stone = stoneTypes.find((s) => s.id === stoneId)
              return (
                <Card key={index} className="w-20 h-20 flex items-center justify-center">
                  <CardContent className="p-2">
                    <img
                      src={stone.image || "/placeholder.svg"}
                      alt={stone.name}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <p className="text-lg text-muted-foreground">Select stones to build the bridge</p>
          )}
        </div>
      </div>

      {/* Available stones */}
      {!gameOver && (
        <div className="w-full">
          <h4 className="text-xl mb-2">Available Stones:</h4>
          <div className="grid grid-cols-4 gap-2">
            {stoneTypes.map((stone) => (
              <Card
                key={stone.id}
                className="cursor-pointer hover:border-primary transition-all"
                onClick={() => handleStoneClick(stone)}
              >
                <CardContent className="p-2 flex flex-col items-center">
                  <img src={stone.image || "/placeholder.svg"} alt={stone.name} className="w-16 h-16 object-contain" />
                  <span className="text-center mt-1">{stone.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Bridge Complete!</h3>
          <p className="text-xl">You've successfully built the bridge to Lanka.</p>
          <p className="text-lg mt-2">Score: {score} points</p>
        </div>
      )}
    </div>
  )
}

