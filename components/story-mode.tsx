"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Volume2 } from "lucide-react"

interface StoryModeProps {
  story: string
  onComplete: () => void
}

export default function StoryMode({ story, onComplete }: StoryModeProps) {
  const [currentPage, setCurrentPage] = useState(0)

  // Ramayana story content
  const storyPages = [
    {
      title: "The Beginning",
      content:
        "Long ago in the kingdom of Ayodhya, there lived a righteous king named Dasharatha. He had three wives but no children. The king performed a sacred fire ritual (yagna) to be blessed with sons.",
      image: "/ss2.png?height=200&width=300",
      choices: null,
    },
    {
      title: "Birth of Rama",
      content:
        "The gods blessed King Dasharatha. Soon, his queens gave birth to four sons: Rama, Bharata, Lakshmana, and Shatrughna. Rama, born to Queen Kaushalya, was an incarnation of Lord Vishnu.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
    {
      title: "The Sage Vishwamitra",
      content:
        "When Rama and Lakshmana were young, the sage Vishwamitra came to Ayodhya seeking help against demons who were disrupting his rituals. King Dasharatha reluctantly allowed his sons to go with the sage.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
    {
      title: "The Bow of Shiva",
      content:
        "Vishwamitra took the princes to Mithila, where King Janaka had announced that whoever could lift and string the divine bow of Lord Shiva would marry his daughter Sita.",
      image: "/placeholder.svg?height=200&width=300",
      choices: [
        {
          text: "Rama attempts to lift the bow",
          nextPage: 4,
        },
        {
          text: "Rama decides not to participate",
          nextPage: 5,
        },
      ],
    },
    {
      title: "Rama Breaks the Bow",
      content:
        "Rama not only lifted the bow but also strung it with such force that it broke in half. The sound echoed throughout the kingdom. King Janaka was overjoyed and gave his daughter Sita's hand in marriage to Rama.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
    {
      title: "An Alternate Path",
      content:
        "Rama decided not to participate in the challenge. However, seeing the disappointment in Sage Vishwamitra's eyes, he reconsidered and approached the bow. With divine strength, he lifted and broke the bow, winning Sita's hand in marriage.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
    {
      title: "Return to Ayodhya",
      content:
        "After the wedding, Rama and Sita returned to Ayodhya with Lakshmana. The people of Ayodhya welcomed them with great joy and celebration.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
    {
      title: "The End of Chapter One",
      content:
        "This concludes the first chapter of the Ramayana. The story continues with Rama's exile to the forest, the abduction of Sita, and the great battle with Ravana.",
      image: "/placeholder.svg?height=200&width=300",
      choices: null,
    },
  ]

  const currentPageData = storyPages[currentPage]

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleChoice = (nextPage) => {
    setCurrentPage(nextPage)
  }

  const playNarration = () => {
    // In a real implementation, this would play audio narration
    alert("Playing narration for: " + currentPageData.title)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-center">The Ramayana</h1>

      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{currentPageData.title}</h2>
            <Button variant="ghost" size="icon" onClick={playNarration}>
              <Volume2 size={24} />
            </Button>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={currentPageData.image || "/placeholder.svg"}
              alt={currentPageData.title}
              className="rounded-lg max-h-64 object-cover"
            />
          </div>

          <p className="text-xl mb-8 leading-relaxed">{currentPageData.content}</p>

          {currentPageData.choices ? (
            <div className="space-y-4">
              <h3 className="text-xl font-medium">What happens next?</h3>
              {currentPageData.choices.map((choice, index) => (
                <Button key={index} className="w-full text-lg py-6 mb-2" onClick={() => handleChoice(choice.nextPage)}>
                  {choice.text}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="text-lg"
              >
                <ChevronLeft className="mr-2" size={20} />
                Previous
              </Button>

              <Button size="lg" onClick={handleNext} className="text-lg">
                {currentPage < storyPages.length - 1 ? "Next" : "Complete"}
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        {storyPages.map((_, index) => (
          <div key={index} className={`h-3 w-3 rounded-full ${currentPage === index ? "bg-primary" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  )
}

