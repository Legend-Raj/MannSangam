"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface VictoryScreenProps {
  title: string
  content: string
  image: string
  score: number
  blessings: number
  onRestart: () => void
}

export default function VictoryScreen({ title, content, image, score, blessings, onRestart }: VictoryScreenProps) {
  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"],
      })

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  const playNarration = () => {
    // In a real implementation, this would play audio narration
    alert("Playing narration for: " + title)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={playNarration}>
            <Volume2 size={24} />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-1/2">
            <img src={image || "/placeholder.svg"} alt={title} className="rounded-lg w-full h-auto object-cover" />
          </div>

          <div className="md:w-1/2">
            <p className="text-xl leading-relaxed mb-6">{content}</p>

            <div className="bg-primary/10 p-4 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-2">Journey Complete!</h3>
              <p className="text-xl mb-2">Final Score: {score}</p>
              <p className="text-xl">Divine Blessings: {blessings}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" onClick={onRestart}>
            Begin New Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

