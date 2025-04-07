"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2 } from "lucide-react"

interface StoryModalProps {
  title: string
  content: string
  onClose: () => void
}

export default function StoryModal({ title, content, onClose }: StoryModalProps) {
  const playNarration = () => {
    // In a real implementation, this would play audio narration
    alert("Playing narration for: " + title)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={playNarration}>
              <Volume2 size={24} />
            </Button>
          </div>

          <div className="mb-6">
            <img
              src="/ss2.png?height=200&width=500"
              alt={title}
              className="rounded-lg w-full h-auto object-cover mb-4"
            />

            <p className="text-xl leading-relaxed">{content}</p>
          </div>

          <div className="flex justify-end">
            <Button size="lg" onClick={onClose}>
              Continue Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

