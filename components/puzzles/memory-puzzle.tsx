"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

// Update the props interface to include language
interface MemoryPuzzleProps {
  content: any
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

// Update the function parameters to include language
export default function MemoryPuzzle({ content, difficulty, gameSpeed, onComplete, language }: MemoryPuzzleProps) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setLoading(true)

    // Create all cards from pairs
    const allCards = []
    content.pairs.forEach((pair) => {
      allCards.push({
        id: `${pair.id}-1`,
        pairId: pair.id,
        name: pair.name,
        image: pair.image1,
      })
      allCards.push({
        id: `${pair.id}-2`,
        pairId: pair.id,
        name: pair.match,
        image: pair.image2,
      })
    })

    // Shuffle cards
    const shuffledCards = allCards.sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameOver(false)

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Handle card click
  const handleCardClick = (cardId) => {
    // Prevent clicking if already two cards are flipped or card is already matched
    if (flipped.length === 2 || matched.includes(cardId) || flipped.includes(cardId)) {
      return
    }

    // Flip the card
    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlipped
      const firstCard = cards.find((card) => card.id === firstId)
      const secondCard = cards.find((card) => card.id === secondId)

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatched([...matched, firstId, secondId])
        setFlipped([])

        // Check if all cards are matched
        if (matched.length + 2 === cards.length) {
          setGameOver(true)
          // Calculate score based on difficulty, moves, and speed
          const baseScore = 100 - moves * 5
          const difficultyBonus = difficulty * 10
          const finalScore = Math.max(baseScore + difficultyBonus, 10)

          setTimeout(() => {
            onComplete(finalScore)
          }, 1500)
        }
      } else {
        // No match, flip cards back after delay
        const delay = 1500 / gameSpeed
        setTimeout(() => {
          setFlipped([])
        }, delay)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Preparing memory challenge...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "memoryChallenge")}</h3>
      <p className="text-lg mb-6">{getTranslation(language, "matchPairs")}</p>

      <div className="flex justify-between items-center w-full mb-4">
        <div className="text-xl">
          {getTranslation(language, "moves")}: {moves}
        </div>
        <Button variant="outline" onClick={initializeGame} disabled={gameOver}>
          {getTranslation(language, "reset")}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {cards.map((card) => (
          <div key={card.id} className="aspect-square cursor-pointer" onClick={() => handleCardClick(card.id)}>
            <Card className={`w-full h-full ${matched.includes(card.id) ? "border-green-500 border-2" : ""}`}>
              <CardContent className="p-2 flex items-center justify-center h-full">
                {flipped.includes(card.id) || matched.includes(card.id) ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={card.image || "/king.svg?height=60&width=60"}
                      alt={card.name}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <span className="text-center text-sm">{card.name}</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-primary/20 rounded-md flex items-center justify-center">
                    <span className="text-3xl">?</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">{getTranslation(language, "excellentMemory")}</h3>
          <p className="text-lg">{getTranslation(language, "completedInMoves", moves)}</p>
        </div>
      )}
    </div>
  )
}

