"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, BookOpen, Brain, Award } from "lucide-react"

// Update the props interface to include language
interface TutorialModalProps {
  onClose: () => void
  language?: string
}

// Import the translation helper
import { getTranslation } from "@/lib/translations"

// Update the function parameters to include language with default value
export default function TutorialModal({ onClose, language = "english" }: TutorialModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">{getTranslation(language, "howToPlay")}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={24} />
            </Button>
          </div>

          <div className="space-y-6 mb-6">
            <div className="flex gap-4 items-start">
              <BookOpen size={40} className="text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-medium mb-2">{getTranslation(language, "storyChoicesTitle")}</h3>
                <p className="text-lg">{getTranslation(language, "storyChoicesDesc")}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Brain size={40} className="text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-medium mb-2">{getTranslation(language, "challengesTitle")}</h3>
                <p className="text-lg mb-3">{getTranslation(language, "challengesDesc")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-lg">
                    <span className="font-medium">{getTranslation(language, "memoryDesc")}</span> Match pairs of related
                    items
                  </li>
                  <li className="text-lg">
                    <span className="font-medium">{getTranslation(language, "patternDesc")}</span> Remember and
                    reproduce sequences
                  </li>
                  <li className="text-lg">
                    <span className="font-medium">{getTranslation(language, "wordDesc")}</span> Match Sanskrit terms
                    with their meanings
                  </li>
                  <li className="text-lg">
                    <span className="font-medium">{getTranslation(language, "hiddenDesc")}</span> Find concealed items
                    in detailed scenes
                  </li>
                  <li className="text-lg">
                    <span className="font-medium">{getTranslation(language, "logicDesc")}</span> Use clues to determine
                    the correct answer
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Award size={40} className="text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-medium mb-2">{getTranslation(language, "progressTitle")}</h3>
                <p className="text-lg">{getTranslation(language, "progressDesc")}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg mb-6">
            <h3 className="text-xl font-medium mb-2">{getTranslation(language, "benefitsTitle")}</h3>
            <p className="text-lg">{getTranslation(language, "benefitsDesc")}</p>
          </div>

          <div className="flex justify-end">
            <Button size="lg" onClick={onClose}>
              {getTranslation(language, "beginYourJourney")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

