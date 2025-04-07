"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface WordGameProps {
  gameSpeed: number
  onScore: (score: number) => void
}

export default function WordGame({ gameSpeed, onScore }: WordGameProps) {
  const [currentWord, setCurrentWord] = useState(null)
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameStatus, setGameStatus] = useState("ready") // ready, playing, finished
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(true)

  // Sanskrit words with meanings
  const words = [
    { sanskrit: "धर्म", transliteration: "Dharma", meaning: "Righteousness, duty" },
    { sanskrit: "कर्म", transliteration: "Karma", meaning: "Action, deed" },
    { sanskrit: "सत्य", transliteration: "Satya", meaning: "Truth" },
    { sanskrit: "अहिंसा", transliteration: "Ahimsa", meaning: "Non-violence" },
    { sanskrit: "योग", transliteration: "Yoga", meaning: "Union, discipline" },
    { sanskrit: "मोक्ष", transliteration: "Moksha", meaning: "Liberation" },
    { sanskrit: "भक्ति", transliteration: "Bhakti", meaning: "Devotion" },
    { sanskrit: "माया", transliteration: "Maya", meaning: "Illusion" },
    { sanskrit: "आत्मन्", transliteration: "Atman", meaning: "Soul, self" },
    { sanskrit: "ब्रह्मन्", transliteration: "Brahman", meaning: "Ultimate reality" },
  ]

  // Initialize game
  useEffect(() => {
    setLoading(false)
  }, [])

  // Timer for game
  useEffect(() => {
    let timer
    if (gameStatus === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000 / gameSpeed)
    } else if (timeLeft === 0 && gameStatus === "playing") {
      endGame()
    }

    return () => clearTimeout(timer)
  }, [timeLeft, gameStatus, gameSpeed])

  // Start new game
  const startGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameStatus("playing")
    setFeedback("")
    nextWord()
  }

  // End game
  const endGame = () => {
    setGameStatus("finished")
    onScore(score)
  }

  // Get next word
  const nextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setCurrentWord(words[randomIndex])
    setUserInput("")
  }

  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const isCorrect = userInput.toLowerCase() === currentWord.meaning.toLowerCase()

    if (isCorrect) {
      setScore(score + 10)
      setFeedback("Correct!")
      setTimeout(() => {
        setFeedback("")
        nextWord()
      }, 1000)
    } else {
      setFeedback("Try again!")
    }
  }

  // Skip current word
  const skipWord = () => {
    setScore(Math.max(0, score - 2)) // Small penalty for skipping
    nextWord()
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
      <h1 className="text-3xl font-bold text-center">Sanskrit Word Association</h1>
      <p className="text-xl text-center">Match the Sanskrit words with their meanings</p>

      {gameStatus === "ready" && (
        <div className="text-center">
          <p className="text-lg mb-4">Type the meaning of each Sanskrit word shown.</p>
          <Button size="lg" onClick={startGame}>
            Start Game
          </Button>
        </div>
      )}

      {gameStatus === "playing" && (
        <>
          <div className="flex justify-between items-center w-full max-w-md">
            <div className="text-xl">Score: {score}</div>
            <div className="text-xl">Time: {timeLeft}s</div>
          </div>

          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">{currentWord.sanskrit}</div>
                <div className="text-xl text-muted-foreground">{currentWord.transliteration}</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Enter the meaning..."
                    value={userInput}
                    onChange={handleInputChange}
                    className="text-xl p-6"
                    autoFocus
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={skipWord}>
                    Skip
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>

              {feedback && (
                <div
                  className={`mt-4 p-2 text-center rounded ${
                    feedback === "Correct!" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {feedback}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {gameStatus === "finished" && (
        <div className="mt-6 p-4 bg-primary/20 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
          <p className="text-xl">Your final score: {score} points</p>
          <Button className="mt-4" onClick={startGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

