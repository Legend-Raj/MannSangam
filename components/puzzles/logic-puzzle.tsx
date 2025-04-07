"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

interface LogicPuzzleProps {
  content: any
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

export default function LogicPuzzle({
  content,
  difficulty,
  gameSpeed,
  onComplete,
  language = "english",
}: LogicPuzzleProps) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // Handle option selection
  const handleOptionSelect = (optionId) => {
    if (hasSubmitted) return
    setSelectedOption(optionId)
  }

  // Handle answer submission
  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return

    setAttempts(attempts + 1)
    setHasSubmitted(true)

    const isCorrect = selectedOption === content.correctAnswer

    if (isCorrect) {
      // Calculate score based on attempts and difficulty
      const baseScore = 100 - attempts * 20
      const difficultyBonus = difficulty * 15
      const finalScore = Math.max(baseScore + difficultyBonus, 10)

      setTimeout(() => {
        onComplete(finalScore)
      }, 2000)
    }
  }

  // Try again
  const tryAgain = () => {
    setSelectedOption(null)
    setHasSubmitted(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "logicChallenge")}</h3>
      <p className="text-lg mb-6">{getTranslation(language, "analyzeClues")}</p>

      <Card className="w-full mb-6">
        <CardContent className="p-6">
          <h4 className="text-xl font-medium mb-4">{getTranslation(language, "clues")}</h4>
          <ul className="space-y-2 list-disc pl-6 mb-6">
            {content.clues.map((clue, index) => (
              <li key={index} className="text-lg">
                {clue}
              </li>
            ))}
          </ul>

          <RadioGroup value={selectedOption?.toString()} className="space-y-4">
            {content.options.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <RadioGroupItem
                  value={option.id.toString()}
                  id={`option-${option.id}`}
                  checked={selectedOption === option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={hasSubmitted}
                />
                <Label
                  htmlFor={`option-${option.id}`}
                  className={`text-lg leading-relaxed cursor-pointer ${
                    hasSubmitted && option.id === content.correctAnswer
                      ? "font-bold text-green-600 dark:text-green-400"
                      : ""
                  }`}
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {hasSubmitted && selectedOption !== content.correctAnswer ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">{getTranslation(language, "notRight")}</h3>
            <p>{getTranslation(language, "tryAgain")}</p>
          </div>
          <Button onClick={tryAgain}>{getTranslation(language, "tryAgain")}</Button>
        </div>
      ) : hasSubmitted ? (
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">{getTranslation(language, "correct")}</h3>
          <p className="text-lg">{getTranslation(language, "impressiveLogic")}</p>
        </div>
      ) : (
        <Button size="lg" className="px-8" onClick={handleSubmit} disabled={!selectedOption}>
          {getTranslation(language, "submitAnswer")}
        </Button>
      )}
    </div>
  )
}

