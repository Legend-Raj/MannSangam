"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

// Update the props interface to include language
interface StoryChoiceProps {
  chapter: any
  onChoiceSelect: (index: number) => void
  audioEnabled: boolean
  language: string
}

// Update the function parameters to include language
export default function StoryChoice({ chapter, onChoiceSelect, audioEnabled, language }: StoryChoiceProps) {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showOutcome, setShowOutcome] = useState(false)

  const handleSelectChoice = (index: number) => {
    setSelectedChoice(index)
    setShowOutcome(true)

    // Play sound if enabled
    if (audioEnabled) {
      // Play choice selection sound
    }
  }

  const handleContinue = () => {
    onChoiceSelect(selectedChoice)
  }

  const playNarration = () => {
    if (audioEnabled) {
      // In a real implementation, this would play audio narration
      alert("Playing narration for: " + chapter.title)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">{chapter.title}</h2>
            <Button variant="ghost" size="icon" onClick={playNarration}>
              <Volume2 size={24} />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-2/5">
              <img
                src={chapter.background || "/ss2.png"}
                alt={chapter.title}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>

            <div className="md:w-3/5">
              <p className="text-xl leading-relaxed">{chapter.narrative}</p>
            </div>
          </div>

          {!showOutcome ? (
            <>
              <h3 className="text-2xl font-medium mb-4">{getTranslation(language, "whatWouldYouChoose")}</h3>
              <div className="space-y-4">
                {chapter.choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-xl py-8 px-6 h-auto text-left justify-start"
                    onClick={() => handleSelectChoice(index)}
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-2xl font-medium mb-3">{getTranslation(language, "yourChoice")}:</h3>
                <p className="text-xl mb-4">{chapter.choices[selectedChoice].text}</p>

                <h3 className="text-2xl font-medium mb-3">{getTranslation(language, "outcome")}:</h3>
                <p className="text-xl">{chapter.choices[selectedChoice].outcome}</p>

                <div className="mt-4 flex gap-4 items-center">
                  <div className="bg-primary/20 px-4 py-2 rounded-full">
                    <span className="font-medium">
                      {getTranslation(language, "wisdomGained")}: +{chapter.choices[selectedChoice].wisdomPoints}
                    </span>
                  </div>
                  <div className="bg-secondary/20 px-4 py-2 rounded-full">
                    <span className="font-medium">
                      {getTranslation(language, "skillBonus")}: {chapter.choices[selectedChoice].skillBonus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="lg" className="text-xl py-6 px-8" onClick={handleContinue}>
                  {getTranslation(language, "continueToChallenge")}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

