"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BattleChallengeProps {
  difficulty: number
  gameSpeed: number
  onComplete: (score: number) => void
}

export default function BattleChallenge({ difficulty, gameSpeed, onComplete }: BattleChallengeProps) {
  const [ravanaHeads, setRavanaHeads] = useState([])
  const [ramaHealth, setRamaHealth] = useState(100)
  const [ravanaHealth, setRavanaHealth] = useState(100)
  const [weakSpot, setWeakSpot] = useState(null)
  const [weakSpotVisible, setWeakSpotVisible] = useState(false)
  const [turns, setTurns] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("Ravana appears with his ten heads! Find his weakness!")

  // Initialize game
  useEffect(() => {
    // Create Ravana's heads
    const heads = []
    for (let i = 0; i < 10; i++) {
      heads.push({
        id: i,
        name: `Head ${i + 1}`,
        image: "/placeholder.svg?height=60&width=60",
        isWeak: false,
        isAttacked: false,
      })
    }

    // Set one random head as the weak spot
    const weakSpotIndex = Math.floor(Math.random() * 10)
    heads[weakSpotIndex].isWeak = true

    setRavanaHeads(heads)
    setWeakSpot(weakSpotIndex)

    // Show weak spot briefly based on difficulty
    setWeakSpotVisible(true)
    setTimeout(
      () => {
        setWeakSpotVisible(false)
      },
      3000 / (gameSpeed * difficulty),
    )
  }, [difficulty, gameSpeed])

  // Handle head attack
  const attackHead = (headId) => {
    if (gameOver) return

    const newHeads = [...ravanaHeads]
    const attackedHead = newHeads.find((head) => head.id === headId)

    // Mark head as attacked
    attackedHead.isAttacked = true
    setRavanaHeads(newHeads)

    // Increment turn counter
    setTurns(turns + 1)

    if (attackedHead.isWeak) {
      // Hit the weak spot!
      const damage = 30 + Math.floor(Math.random() * 20)
      const newHealth = Math.max(0, ravanaHealth - damage)
      setRavanaHealth(newHealth)
      setMessage(`You found Ravana's weakness! Dealt ${damage} damage.`)

      if (newHealth <= 0) {
        // Ravana defeated
        handleVictory()
      } else {
        // Ravana attacks back with less power
        ravanaAttack(10)
      }
    } else {
      // Missed the weak spot
      const damage = 5 + Math.floor(Math.random() * 10)
      const newHealth = Math.max(0, ravanaHealth - damage)
      setRavanaHealth(newHealth)
      setMessage(`You hit Ravana but it's not very effective. Dealt ${damage} damage.`)

      if (newHealth <= 0) {
        // Ravana defeated
        handleVictory()
      } else {
        // Ravana attacks back with full power
        ravanaAttack(15 + difficulty * 5)
      }
    }
  }

  // Ravana attacks Rama
  const ravanaAttack = (maxDamage) => {
    setTimeout(() => {
      const damage = Math.floor(Math.random() * maxDamage) + 5
      const newHealth = Math.max(0, ramaHealth - damage)
      setRamaHealth(newHealth)
      setMessage(`Ravana attacks! You take ${damage} damage.`)

      if (newHealth <= 0) {
        // Rama defeated
        handleDefeat()
      }

      // Occasionally reveal the weak spot again
      if (Math.random() < 0.2) {
        setWeakSpotVisible(true)
        setTimeout(() => {
          setWeakSpotVisible(false)
        }, 1000 / gameSpeed)
      }
    }, 1000 / gameSpeed)
  }

  // Handle victory
  const handleVictory = () => {
    setGameOver(true)
    setMessage("Victory! You have defeated the demon king Ravana!")

    // Calculate score based on health remaining and turns taken
    const healthBonus = ramaHealth * 2
    const turnPenalty = Math.min(turns * 5, 50)
    const difficultyBonus = difficulty * 30
    const finalScore = 100 + healthBonus - turnPenalty + difficultyBonus

    setTimeout(() => {
      onComplete(finalScore)
    }, 3000)
  }

  // Handle defeat
  const handleDefeat = () => {
    setGameOver(true)
    setMessage("Defeat! Ravana has bested you this time.")

    setTimeout(() => {
      onComplete(20) // Minimal score for trying
    }, 3000)
  }

  // Use divine power (hint)
  const useDivinePower = () => {
    setWeakSpotVisible(true)
    setTimeout(() => {
      setWeakSpotVisible(false)
    }, 2000 / gameSpeed)

    // Small health penalty for using divine power
    const newHealth = Math.max(0, ramaHealth - 5)
    setRamaHealth(newHealth)

    if (newHealth <= 0) {
      handleDefeat()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Battle with Ravana</h3>

      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-lg">Rama</span>
          <span className="text-lg">{ramaHealth}%</span>
        </div>
        <Progress value={ramaHealth} className="h-4 mb-4" />

        <div className="flex justify-between items-center mb-1">
          <span className="text-lg">Ravana</span>
          <span className="text-lg">{ravanaHealth}%</span>
        </div>
        <Progress value={ravanaHealth} className="h-4" />
      </div>

      <div className="bg-primary/10 p-3 rounded-lg mb-4 w-full text-center">
        <p className="text-lg">{message}</p>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {ravanaHeads.map((head) => (
          <Card
            key={head.id}
            className={`cursor-pointer transition-all ${head.isAttacked ? "opacity-50" : "hover:border-primary"} ${
              weakSpotVisible && head.isWeak ? "border-red-500 border-2" : ""
            }`}
            onClick={() => !head.isAttacked && attackHead(head.id)}
          >
            <CardContent className="p-2 flex flex-col items-center">
              <img src={head.image || "/placeholder.svg"} alt={head.name} className="w-12 h-12 object-contain" />
              <span className="text-center text-sm mt-1">{head.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {!gameOver && (
        <Button variant="outline" onClick={useDivinePower} className="mb-4">
          Use Divine Power (Hint)
        </Button>
      )}

      {gameOver && (
        <div
          className={`text-center p-4 rounded-lg ${
            ramaHealth > 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
          }`}
        >
          <h3 className="text-2xl font-bold mb-2">{ramaHealth > 0 ? "Victory!" : "Defeat!"}</h3>
          <p className="text-lg">
            {ramaHealth > 0 ? "You have defeated the demon king Ravana!" : "Ravana has bested you this time."}
          </p>
        </div>
      )}
    </div>
  )
}

