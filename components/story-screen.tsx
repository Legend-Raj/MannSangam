"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"

interface StoryScreenProps {
  title: string
  content: string
  image: string
  onContinue: () => void
}

export default function StoryScreen({ title, content, image, onContinue }: StoryScreenProps) {
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
            <p className="text-xl leading-relaxed">{content}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" onClick={onContinue}>
            Continue Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

