"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

interface WordPuzzleProps {
  content: any
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

export default function WordPuzzle({
  content,
  difficulty,
  gameSpeed,
  onComplete,
  language = "english",
}: WordPuzzleProps) {
  const [sanskritWords, setSanskritWords] = useState([])
  const [meanings, setMeanings] = useState([])
  const [matches, setMatches] = useState({})
  const [selectedSanskrit, setSelectedSanskrit] = useState(null)
  const [correctMatches, setCorrectMatches] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setLoading(true)

    // Extract and shuffle Sanskrit words
    const words = content.pairs.map((pair) => ({
      id: pair.sanskrit,
      sanskrit: pair.sanskrit,
      transliteration: pair.transliteration,
    }))
    const shuffledWords = [...words].sort(() => Math.random() - 0.5)

    // Extract and shuffle meanings
    const meaningsList = content.pairs.map((pair) => ({
      id: pair.sanskrit, // Use same ID to match pairs
      meaning: pair.meaning,
    }))
    const shuffledMeanings = [...meaningsList].sort(() => Math.random() - 0.5)

    setSanskritWords(shuffledWords)
    setMeanings(shuffledMeanings)
    setMatches({})
    setSelectedSanskrit(null)
    setCorrectMatches(0)
    setAttempts(0)
    setComplete(false)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Handle Sanskrit word selection
  const selectSanskritWord = (wordId) => {
    // Skip if word already matched
    if (Object.values(matches).includes(wordId)) return

    setSelectedSanskrit(wordId)
  }

  // Handle meaning selection
  const selectMeaning = (meaningId) => {
    // Skip if meaning already matched or no Sanskrit word selected
    if (!selectedSanskrit || matches[meaningId]) return

    // Attempt to match
    setAttempts(attempts + 1)

    // Check if correct match
    if (selectedSanskrit === meaningId) {
      // Correct match
      const newMatches = { ...matches, [meaningId]: selectedSanskrit }
      setMatches(newMatches)

      const newCorrectMatches = correctMatches + 1
      setCorrectMatches(newCorrectMatches)

      // Check if all matched
      if (newCorrectMatches === content.pairs.length) {
        setComplete(true)

        // Calculate score
        const baseScore = 100 - (attempts - content.pairs.length) * 5
        const difficultyBonus = difficulty * 10
        const finalScore = Math.max(baseScore + difficultyBonus, 10)

        setTimeout(() => {
          onComplete(finalScore)
        }, 2000)
      }
    }

    // Reset Sanskrit selection
    setSelectedSanskrit(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Preparing word challenge...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "wordChallenge")}</h3>
      <p className="text-lg mb-6">{getTranslation(language, "matchWords")}</p>

      <div className="flex justify-between items-center w-full mb-4">
        <div className="text-xl">
          {getTranslation(language, "matches")} {correctMatches}/{content.pairs.length}
        </div>
        <Button variant="outline" onClick={initializeGame} disabled={complete}>
          {getTranslation(language, "reset")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Sanskrit words column */}
        <div>
          <h4 className="text-xl mb-3 text-center">{getTranslation(language, "sanskritWords")}</h4>
          <div className="space-y-3">
            {sanskritWords.map((word) => {
              const isMatched = Object.values(matches).includes(word.id)
              const isSelected = selectedSanskrit === word.id

              return (
                <Card
                  key={word.id}
                  className={`cursor-pointer transition-all ${
                    isMatched
                      ? "bg-green-100 dark:bg-green-900 opacity-50"
                      : isSelected
                        ? "border-primary border-2"
                        : "hover:border-primary"
                  }`}
                  onClick={() => selectSanskritWord(word.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <p className="text-2xl mb-1">{word.sanskrit}</p>
                      <p className="text-sm text-muted-foreground">{word.transliteration}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Meanings column */}
        <div>
          <h4 className="text-xl mb-3 text-center">{getTranslation(language, "meanings")}</h4>
          <div className="space-y-3">
            {meanings.map((meaning) => {
              const isMatched = !!matches[meaning.id]

              return (
                <Card
                  key={meaning.id}
                  className={`cursor-pointer transition-all ${
                    isMatched ? "bg-green-100 dark:bg-green-900" : "hover:border-primary"
                  }`}
                  onClick={() => selectMeaning(meaning.id)}
                >
                  <CardContent className="p-4">
                    <p className="text-xl text-center">{meaning.meaning}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {complete && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">{getTranslation(language, "challengeComplete")}</h3>
          <p className="text-lg">{getTranslation(language, "allMatched")}</p>
        </div>
      )}
    </div>
  )
}

