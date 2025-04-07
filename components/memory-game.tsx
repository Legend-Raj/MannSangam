"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface MemoryGameProps {
  gameSpeed: number
  onScore: (score: number) => void
}

export default function MemoryGame({ gameSpeed, onScore }: MemoryGameProps) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true)

  // Characters from Ramayana
  const characters = [
    { id: 1, name: "Rama", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Sita", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Lakshmana", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Hanuman", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Ravana", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Jatayu", image: "/placeholder.svg?height=100&width=100" },
  ]

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setLoading(true)

    // Create pairs of cards
    const cardPairs = [...characters, ...characters].map((character, index) => ({
      ...character,
      uniqueId: `${character.id}-${index}`,
    }))

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameOver(false)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Handle card click
  const handleCardClick = (uniqueId) => {
    // Prevent clicking if already two cards are flipped or card is already matched
    if (flipped.length === 2 || matched.includes(uniqueId) || flipped.includes(uniqueId)) {
      return
    }

    // Flip the card
    const newFlipped = [...flipped, uniqueId]
    setFlipped(newFlipped)

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlipped
      const firstCard = cards.find((card) => card.uniqueId === firstId)
      const secondCard = cards.find((card) => card.uniqueId === secondId)

      if (firstCard.id === secondCard.id) {
        // Match found
        setMatched([...matched, firstId, secondId])
        setFlipped([])

        // Check if all cards are matched
        if (matched.length + 2 === cards.length) {
          setGameOver(true)
          onScore(Math.max(100 - moves * 5, 10)) // Calculate score based on moves
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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-2xl mt-4">Loading Game...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-center">Memory Match</h1>
      <p className="text-xl text-center">Match the characters from Ramayana</p>

      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-xl">Moves: {moves}</div>
        <Button variant="outline" onClick={initializeGame}>
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`aspect-square cursor-pointer transition-all duration-500 ${
              flipped.includes(card.uniqueId) || matched.includes(card.uniqueId) ? "rotate-y-0" : "rotate-y-180"
            }`}
            onClick={() => handleCardClick(card.uniqueId)}
          >
            <Card className={`w-full h-full ${matched.includes(card.uniqueId) ? "border-green-500 border-2" : ""}`}>
              <CardContent className="p-2 flex items-center justify-center h-full">
                {flipped.includes(card.uniqueId) || matched.includes(card.uniqueId) ? (
                  <div className="flex flex-col items-center">
                    <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-16 h-16 object-contain" />
                    <span className="text-center mt-1">{card.name}</span>
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
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-xl">You completed the game in {moves} moves.</p>
          <p className="text-lg mt-2">Score: {Math.max(100 - moves * 5, 10)} points</p>
          <Button className="mt-4" onClick={initializeGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

