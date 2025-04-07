"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MemoryPuzzle from "@/components/puzzles/memory-puzzle"
import PatternPuzzle from "@/components/puzzles/pattern-puzzle"
import WordPuzzle from "@/components/puzzles/word-puzzle"
import AttentionPuzzle from "@/components/puzzles/attention-puzzle"
import LogicPuzzle from "@/components/puzzles/logic-puzzle"
import { getTranslation } from "@/lib/translations"

interface CognitivePuzzleProps {
  puzzle: any
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

export default function CognitivePuzzle({ puzzle, gameSpeed, onComplete, language }: CognitivePuzzleProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const [score, setScore] = useState(0)
  const [puzzleComplete, setPuzzleComplete] = useState(false)

  const handlePuzzleComplete = (puzzleScore: number) => {
    setScore(puzzleScore)
    setPuzzleComplete(true)
  }

  const handleContinue = () => {
    onComplete(score)
  }

  const renderPuzzle = () => {
    if (showInstructions) {
      return (
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "cognitiveChallenge")}</h3>
          <p className="text-xl mb-8">{puzzle.instructions}</p>
          <Button size="lg" className="text-xl py-6 px-8" onClick={() => setShowInstructions(false)}>
            {getTranslation(language, "beginChallenge")}
          </Button>
        </div>
      )
    }

    if (puzzleComplete) {
      return (
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "challengeComplete")}</h3>
          <p className="text-xl mb-6">
            {getTranslation(language, "yourScore")} {score} points
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="text-xl py-6 px-8" onClick={handleContinue}>
              {getTranslation(language, "continueJourney")}
            </Button>
          </div>
        </div>
      )
    }

    switch (puzzle.type) {
      case "memory":
        return (
          <MemoryPuzzle
            content={puzzle.content}
            difficulty={puzzle.difficulty}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )
      case "pattern":
        return (
          <PatternPuzzle
            content={puzzle.content}
            difficulty={puzzle.difficulty}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )
      case "word":
        return (
          <WordPuzzle
            content={puzzle.content}
            difficulty={puzzle.difficulty}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )
      case "attention":
        return (
          <AttentionPuzzle
            content={puzzle.content}
            difficulty={puzzle.difficulty}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )
      case "logic":
        return (
          <LogicPuzzle
            content={puzzle.content}
            difficulty={puzzle.difficulty}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )
      default:
        return <div>Puzzle type not found</div>
    }
  }

  return (
    <Card>
      <CardContent className="p-6">{renderPuzzle()}</CardContent>
    </Card>
  )
}

