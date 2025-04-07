"use client"

import { useState, useEffect, useRef } from "react"
import { Check, AlertCircle } from "lucide-react"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

interface AttentionPuzzleProps {
  content: any
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
  language: string
}

export default function AttentionPuzzle({
  content,
  difficulty,
  gameSpeed,
  onComplete,
  language = "english",
}: AttentionPuzzleProps) {
  const [foundItems, setFoundItems] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [complete, setComplete] = useState(false)
  const [message, setMessage] = useState("")
  const imageRef = useRef(null)

  // Set up timer
  useEffect(() => {
    if (timeLeft > 0 && !complete) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000 / gameSpeed)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !complete) {
      // Time's up - calculate score
      const baseScore = 20 + foundItems.length * 20
      onComplete(baseScore)
    }
  }, [timeLeft, complete, gameSpeed])

  // Handle image click
  const handleImageClick = (e) => {
    if (complete) return

    // Get click coordinates relative to image
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert to percentage of image size for responsiveness
    const percentX = (x / rect.width) * 100
    const percentY = (y / rect.height) * 100

    // Check if click is near any hidden item
    let found = false
    content.hiddenItems.forEach((item) => {
      if (foundItems.includes(item.id)) return

      // Convert item coordinates to percentage
      const itemX = (item.coordinates.x / 600) * 100 // Assuming original image width is 600
      const itemY = (item.coordinates.y / 400) * 100 // Assuming original image height is 400
      const itemRadius = (item.radius / 600) * 100

      // Calculate distance between click and item center
      const distance = Math.sqrt(Math.pow(percentX - itemX, 2) + Math.pow(percentY - itemY, 2))

      // Check if click is within item radius
      if (distance <= itemRadius) {
        // Found an item!
        setFoundItems([...foundItems, item.id])
        setMessage(`You found: ${item.name}!`)
        found = true

        // Check if all items are found
        if (foundItems.length + 1 === content.hiddenItems.length) {
          setComplete(true)

          // Calculate score based on time left, attempts, and difficulty
          const timeBonus = timeLeft * 2
          const difficultyBonus = difficulty * 15
          const finalScore = 50 + timeBonus + difficultyBonus

          setTimeout(() => {
            onComplete(finalScore)
          }, 2000)
        }
      }
    })

    if (!found) {
      setAttempts(attempts + 1)
      setMessage("Try again!")

      // Clear message after a short delay
      setTimeout(() => {
        setMessage("")
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">{getTranslation(language, "attentionChallenge")}</h3>
      <p className="text-lg mb-2">{getTranslation(language, "findHidden")}</p>

      <div className="flex justify-between items-center w-full mb-4">
        <div className="text-xl">
          {getTranslation(language, "found")} {foundItems.length}/{content.hiddenItems.length}
        </div>
        <div className="text-xl">
          {getTranslation(language, "timeLeft")} {timeLeft}s
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 p-2 rounded-lg text-center w-full ${
            message.includes("found") ? "bg-green-100 dark:bg-green-900" : "bg-yellow-100 dark:bg-yellow-900"
          }`}
        >
          <p className="text-lg">{message}</p>
        </div>
      )}

      <div className="relative w-full mb-6 border rounded-lg overflow-hidden">
        <img
          ref={imageRef}
          src={content.image || "/placeholder.svg"}
          alt="Find hidden objects"
          className="w-full h-auto"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />

        {/* Show markers for found items */}
        {foundItems.map((itemId) => {
          const item = content.hiddenItems.find((i) => i.id === itemId)
          return (
            <div
              key={itemId}
              className="absolute bg-green-500 rounded-full border-2 border-white"
              style={{
                left: `${(item.coordinates.x / 600) * 100}%`,
                top: `${(item.coordinates.y / 400) * 100}%`,
                width: `${((item.radius * 2) / 600) * 100}%`,
                height: `${((item.radius * 2) / 400) * 100}%`,
                transform: "translate(-50%, -50%)",
                opacity: 0.5,
              }}
            />
          )
        })}
      </div>

      <div className="w-full">
        <h4 className="text-xl mb-2">{getTranslation(language, "itemsToFind")}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {content.hiddenItems.map((item) => (
            <div
              key={item.id}
              className={`p-2 rounded-lg flex items-center ${
                foundItems.includes(item.id) ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {foundItems.includes(item.id) ? (
                <Check className="mr-2 text-green-600 dark:text-green-400" size={16} />
              ) : (
                <AlertCircle className="mr-2 text-gray-400" size={16} />
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {complete && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">{getTranslation(language, "challengeComplete")}</h3>
          <p className="text-lg">{getTranslation(language, "foundAllItems", 60 - timeLeft)}</p>
        </div>
      )}
    </div>
  )
}

