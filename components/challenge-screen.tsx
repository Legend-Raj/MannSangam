"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ArcheryChallenge from "@/components/challenges/archery-challenge"
import BridgeChallenge from "@/components/challenges/bridge-challenge"
import BattleChallenge from "@/components/challenges/battle-challenge"

interface ChallengeScreenProps {
  challengeType: string
  title: string
  instruction: string
  difficulty: number
  gameSpeed: number
  onComplete: (score: number, blessings: number) => void
}

export default function ChallengeScreen({
  challengeType,
  title,
  instruction,
  difficulty,
  gameSpeed,
  onComplete,
}: ChallengeScreenProps) {
  const [isReady, setIsReady] = useState(false)

  const handleComplete = (score: number) => {
    // Calculate blessings based on score and difficulty
    const blessings = Math.floor((score * difficulty) / 100)
    onComplete(score, blessings)
  }

  const renderChallenge = () => {
    if (!isReady) {
      return (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-6">{title}</h3>
          <p className="text-xl mb-8">{instruction}</p>
          <Button size="lg" onClick={() => setIsReady(true)}>
            Begin Challenge
          </Button>
        </div>
      )
    }

    switch (challengeType) {
      case "archery":
        return <ArcheryChallenge difficulty={difficulty} gameSpeed={gameSpeed} onComplete={handleComplete} />
      case "bridge":
        return <BridgeChallenge difficulty={difficulty} gameSpeed={gameSpeed} onComplete={handleComplete} />
      case "battle":
        return <BattleChallenge difficulty={difficulty} gameSpeed={gameSpeed} onComplete={handleComplete} />
      default:
        return <div>Challenge not found</div>
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">{renderChallenge()}</CardContent>
    </Card>
  )
}

