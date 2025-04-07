"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

interface PatternPuzzleProps {
  content: any
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

export default function PatternPuzzle({
  content,
  difficulty,
  gameSpeed,
  onComplete,
  language = "english",
}: PatternPuzzleProps) {
  const [selectedPattern, setSelectedPattern] = useState([])
  const [showPattern, setShowPattern] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [patternCorrect, setPatternCorrect] = useState(false)

  // Show pattern briefly at start
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPattern(false)
    }, 4000 / gameSpeed)

    return () => clearTimeout(timer)
  }, [gameSpeed])

  // Handle item selection
  const handleItemSelect = (itemId) => {
    if (patternCorrect) return

    // Add item to pattern
    setSelectedPattern([...selectedPattern, itemId])
  }

  // Check pattern
  const checkPattern = () => {
    const isCorrect = content.correctPattern.every((id, index) => id === selectedPattern[index])

    setAttempts(attempts + 1)

    if (isCorrect) {
      setPatternCorrect(true)

      // Calculate score based on difficulty, attempts, and speed
      const baseScore = 100 - attempts * 15
      const difficultyBonus = difficulty * 15
      const finalScore = Math.max(baseScore + difficultyBonus, 10)

      setTimeout(() => {
        onComplete(finalScore)
      }, 2000)
    } else {
      // Reset pattern on incorrect attempt
      setSelectedPattern([])

      // Show correct pattern briefly
      setShowPattern(true)
      setTimeout(() => {
        setShowPattern(false)
      }, 3000 / gameSpeed)
    }
  }

  // Reset attempt
  const resetAttempt = () => {
    setSelectedPattern([])
  }

  // Show hint
  const showHint = () => {
    setShowPattern(true)
    setTimeout(() => {
      setShowPattern(false)
    }, 2000 / gameSpeed)
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "patternChallenge")}</h3>
      <p className="text-lg mb-6">{getTranslation(language, "rememberPattern")}</p>

      {/* Pattern display area */}
      <div className="w-full mb-6">
        <h4 className="text-xl mb-2">
          {showPattern
            ? getTranslation(language, "rememberThis")
            : patternCorrect
              ? getTranslation(language, "correctPattern")
              : getTranslation(language, "yourSequence")}
        </h4>

        <div className="flex justify-center gap-3 p-4 bg-primary/10 rounded-lg min-h-[100px] items-center">
          {showPattern ? (
            content.correctPattern.map((itemId, index) => {
              const item = content.items.find((i) => i.id === itemId)
              return (
                <Card key={index} className="w-16 h-16 flex items-center justify-center">
                  <CardContent className="p-2">
                    <img
                      src={item.image || "/placeholder.svg?height=50&width=50"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              )
            })
          ) : selectedPattern.length > 0 ? (
            selectedPattern.map((itemId, index) => {
              const item = content.items.find((i) => i.id === itemId)
              return (
                <Card key={index} className="w-16 h-16 flex items-center justify-center">
                  <CardContent className="p-2">
                    <img
                      src={item.image || "/placeholder.svg?height=50&width=50"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <p className="text-lg text-muted-foreground">{getTranslation(language, "selectItems")}</p>
          )}
        </div>
      </div>

      {/* Available items */}
      <div className="w-full mb-6">
        <h4 className="text-xl mb-2">{getTranslation(language, "availableItems")}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {content.items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => handleItemSelect(item.id)}
            >
              <CardContent className="p-3 flex flex-col items-center">
                <img
                  src={item.image || "/placeholder.svg?height=50&width=50"}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-center mt-1">{item.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!patternCorrect && (
          <>
            <Button variant="outline" onClick={resetAttempt} disabled={selectedPattern.length === 0}>
              <ArrowLeft className="mr-2" size={18} />
              Reset
            </Button>

            <Button variant="outline" onClick={showHint}>
              {getTranslation(language, "showPattern")}
            </Button>

            <Button onClick={checkPattern} disabled={selectedPattern.length !== content.correctPattern.length}>
              <Check className="mr-2" size={18} />
              {getTranslation(language, "checkPattern")}
            </Button>
          </>
        )}
      </div>

      {patternCorrect && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">{getTranslation(language, "patternComplete")}</h3>
          <p className="text-lg">{getTranslation(language, "patternCorrect")}</p>
        </div>
      )}
    </div>
  )
}

