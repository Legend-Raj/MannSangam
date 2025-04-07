"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Settings, HelpCircle } from "lucide-react"
import StoryChoice from "@/components/story-choice"
import CognitivePuzzle from "@/components/cognitive-puzzle"
import GameSettings from "@/components/game-settings"
import TutorialModal from "@/components/tutorial-modal"
import { cn } from "@/lib/utils"

// Import the translation helper
import { getTranslation } from "@/lib/translations"

// Import game content
import { getGameContent } from "@/lib/game-content"

// Get game content based on language
const getChapters = (lang) => {
  return getGameContent(lang)
}

export default function MythWisdom() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentStage, setCurrentStage] = useState("story") // 'story' or 'puzzle'
  const [progressPoints, setProgressPoints] = useState(0)
  const [wisdomGained, setWisdomGained] = useState(0)
  const [memoryScore, setMemoryScore] = useState(0)
  const [logicScore, setLogicScore] = useState(0)
  const [attentionScore, setAttentionScore] = useState(0)
  const [playerChoices, setPlayerChoices] = useState([])

  // UI state
  const [showSettings, setShowSettings] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [fontSize, setFontSize] = useState(18)
  const [highContrast, setHighContrast] = useState(false)
  const [gameSpeed, setGameSpeed] = useState(1)

  // Add language state
  const [language, setLanguage] = useState("english")

  // Game content - storyline chapters with puzzles
  // const gameChapters = [
  //   {
  //     title: "The Beginning",
  //     background: "/placeholder.svg?height=300&width=600",
  //     narrative:
  //       "In the ancient kingdom of Ayodhya, King Dasharatha longed for an heir. After performing a sacred fire ritual, he was blessed with four sons. The eldest, Rama, grew into a virtuous prince beloved by all. As a young man, Rama was called upon to protect the sages in the forest from demons.",
  //     choices: [
  //       {
  //         text: "Rama agrees to help the sages immediately",
  //         outcome:
  //           "Rama's swift decision to help those in need demonstrates his commitment to dharma (righteousness). The sages are grateful and share ancient wisdom with him.",
  //         wisdomPoints: 3,
  //         skillBonus: "attention",
  //       },
  //       {
  //         text: "Rama consults with his teacher first",
  //         outcome:
  //           "Rama seeks guidance from his guru, showing humility and respect for wisdom. His teacher offers strategic advice that will help Rama in his upcoming challenges.",
  //         wisdomPoints: 2,
  //         skillBonus: "logic",
  //       },
  //       {
  //         text: "Rama gathers his brothers to join him",
  //         outcome:
  //           "Rama recognizes the value of family support. Together with his brother Lakshmana, he becomes better prepared for the challenges ahead.",
  //         wisdomPoints: 2,
  //         skillBonus: "memory",
  //       },
  //     ],
  //     puzzle: {
  //       type: "memory",
  //       difficulty: 1,
  //       instructions: "Match the items that belong together in the royal court of Ayodhya.",
  //       content: {
  //         pairs: [
  //           {
  //             id: 1,
  //             name: "King",
  //             match: "Crown",
  //             image1: "/placeholder.svg?height=100&width=100",
  //             image2: "/placeholder.svg?height=100&width=100",
  //           },
  //           {
  //             id: 2,
  //             name: "Bow",
  //             match: "Arrow",
  //             image1: "/placeholder.svg?height=100&width=100",
  //             image2: "/placeholder.svg?height=100&width=100",
  //           },
  //           {
  //             id: 3,
  //             name: "Sage",
  //             match: "Scripture",
  //             image1: "/placeholder.svg?height=100&width=100",
  //             image2: "/placeholder.svg?height=100&width=100",
  //           },
  //           {
  //             id: 4,
  //             name: "Prince",
  //             match: "Sword",
  //             image1: "/placeholder.svg?height=100&width=100",
  //             image2: "/placeholder.svg?height=100&width=100",
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     title: "The Test of Strength",
  //     background: "/placeholder.svg?height=300&width=600",
  //     narrative:
  //       "Rama and his brother Lakshmana traveled with the sage Vishwamitra to the kingdom of Mithila. There, King Janaka had organized a contest: whoever could lift and string the divine bow of Lord Shiva would win the hand of his daughter Sita in marriage. Many strong princes and warriors had already tried and failed.",
  //     choices: [
  //       {
  //         text: "Rama approaches the bow with confidence",
  //         outcome:
  //           "Rama's self-assurance impresses the court. With seemingly effortless strength, he not only lifts the bow but strings it so powerfully that it breaks in half, stunning everyone present.",
  //         wisdomPoints: 2,
  //         skillBonus: "attention",
  //       },
  //       {
  //         text: "Rama observes others before attempting",
  //         outcome:
  //           "Rama's careful observation reveals why others failed. When his turn comes, he adjusts his approach and succeeds where others failed, showing the value of learning from others' mistakes.",
  //         wisdomPoints: 3,
  //         skillBonus: "logic",
  //       },
  //       {
  //         text: "Rama pays respects to the bow before touching it",
  //         outcome:
  //           "Rama honors the divine nature of Lord Shiva's bow, showing his reverence. This spiritual connection gives him strength, and he completes the task with divine blessing.",
  //         wisdomPoints: 2,
  //         skillBonus: "memory",
  //       },
  //     ],
  //     puzzle: {
  //       type: "pattern",
  //       difficulty: 2,
  //       instructions: "Arrange the royal symbols in the correct order to honor the ceremony.",
  //       content: {
  //         correctPattern: [3, 1, 4, 2],
  //         items: [
  //           { id: 1, name: "Lotus", image: "/placeholder.svg?height=100&width=100" },
  //           { id: 2, name: "Conch", image: "/placeholder.svg?height=100&width=100" },
  //           { id: 3, name: "Lamp", image: "/placeholder.svg?height=100&width=100" },
  //           { id: 4, name: "Garland", image: "/placeholder.svg?height=100&width=100" },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     title: "Forest Exile",
  //     background: "/placeholder.svg?height=300&width=600",
  //     narrative:
  //       "On the eve of Rama's coronation as king, Queen Kaikeyi asked King Dasharatha to honor two boons he had promised her: to crown her son Bharata instead and to send Rama to the forest for fourteen years. Though heartbroken, King Dasharatha was bound by his word. When Rama learned of this, he faced a difficult choice.",
  //     choices: [
  //       {
  //         text: "Rama accepts the exile without complaint",
  //         outcome:
  //           "Rama's unwavering adherence to duty and respect for his father's promise demonstrates his extraordinary character. His graceful acceptance inspires those around him, including his devoted wife Sita, who insists on accompanying him.",
  //         wisdomPoints: 3,
  //         skillBonus: "attention",
  //       },
  //       {
  //         text: "Rama discusses alternatives with his advisors",
  //         outcome:
  //           "Rama's advisors suggest many ways to challenge the decision, but ultimately Rama chooses the path of duty. His willingness to listen before deciding shows wisdom.",
  //         wisdomPoints: 2,
  //         skillBonus: "logic",
  //       },
  //       {
  //         text: "Rama prepares carefully for forest life",
  //         outcome:
  //           "Rama's practical approach serves him well. By gathering knowledge and supplies for forest survival, he ensures that he, Sita, and Lakshmana will be better prepared for the challenges ahead.",
  //         wisdomPoints: 2,
  //         skillBonus: "memory",
  //       },
  //     ],
  //     puzzle: {
  //       type: "word",
  //       difficulty: 2,
  //       instructions: "Match these Sanskrit words with their meanings to understand the forest teachings.",
  //       content: {
  //         pairs: [
  //           { sanskrit: "धर्म", transliteration: "Dharma", meaning: "Righteousness" },
  //           { sanskrit: "सत्य", transliteration: "Satya", meaning: "Truth" },
  //           { sanskrit: "अहिंसा", transliteration: "Ahimsa", meaning: "Non-violence" },
  //           { sanskrit: "तपस्", transliteration: "Tapas", meaning: "Discipline" },
  //           { sanskrit: "सेवा", transliteration: "Seva", meaning: "Service" },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     title: "The Golden Deer",
  //     background: "/placeholder.svg?height=300&width=600",
  //     narrative:
  //       "During their exile, Rama, Sita, and Lakshmana lived peacefully in the forest. One day, a beautiful golden deer appeared near their cottage. Sita was enchanted by it and asked Rama to catch it for her. Rama sensed something unusual about the deer.",
  //     choices: [
  //       {
  //         text: "Rama refuses to chase the deer",
  //         outcome:
  //           "Rama's caution proves wise. The deer was indeed the demon Maricha in disguise, sent to lure Rama away from Sita. By staying vigilant, Rama protected his wife from the demon king Ravana's plot.",
  //         wisdomPoints: 3,
  //         skillBonus: "logic",
  //       },
  //       {
  //         text: "Rama follows the deer but leaves instructions",
  //         outcome:
  //           "Before pursuing the deer, Rama instructs Lakshmana to protect Sita at all costs. Though he falls into the trap, his foresight ensures a plan is in place, showing the importance of preparation.",
  //         wisdomPoints: 2,
  //         skillBonus: "memory",
  //       },
  //       {
  //         text: "Rama sends Lakshmana instead",
  //         outcome:
  //           "Rama delegates the task while staying to protect Sita himself. This proves partially effective, as Ravana must use more deception to proceed with his plan.",
  //         wisdomPoints: 2,
  //         skillBonus: "attention",
  //       },
  //     ],
  //     puzzle: {
  //       type: "attention",
  //       difficulty: 3,
  //       instructions: "Find the hidden demons disguised in this forest scene.",
  //       content: {
  //         image: "/placeholder.svg?height=400&width=600",
  //         hiddenItems: [
  //           { id: 1, name: "Demon in tree", coordinates: { x: 120, y: 200 }, radius: 30 },
  //           { id: 2, name: "Snake demon", coordinates: { x: 350, y: 300 }, radius: 25 },
  //           { id: 3, name: "Shadow demon", coordinates: { x: 500, y: 150 }, radius: 35 },
  //           { id: 4, name: "Water demon", coordinates: { x: 200, y: 350 }, radius: 30 },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     title: "The Search for Sita",
  //     background: "/placeholder.svg?height=300&width=600",
  //     narrative:
  //       "After Ravana abducted Sita, Rama and Lakshmana searched desperately for her. They encountered Jatayu, an ancient bird who had tried to stop Ravana. Though mortally wounded, Jatayu informed them that Ravana had taken Sita southward. As they continued their journey, they met Hanuman, the mighty monkey warrior.",
  //     choices: [
  //       {
  //         text: "Rama forms an alliance with the monkey kingdom",
  //         outcome:
  //           "Rama's diplomatic skill secures powerful allies. With Hanuman and the monkey army at his side, finding Sita becomes possible, showing the strength that comes from cooperation.",
  //         wisdomPoints: 3,
  //         skillBonus: "logic",
  //       },
  //       {
  //         text: "Rama shares his complete story with Hanuman",
  //         outcome:
  //           "By opening up to Hanuman, Rama creates deep loyalty. Moved by Rama's integrity and suffering, Hanuman pledges his life to the cause, becoming Rama's most devoted servant.",
  //         wisdomPoints: 2,
  //         skillBonus: "memory",
  //       },
  //       {
  //         text: "Rama gives Hanuman his ring as a token for Sita",
  //         outcome:
  //           "Rama's thoughtfulness provides a way for Sita to know any messenger is genuine. This small detail becomes crucial when Hanuman eventually finds her in Lanka.",
  //         wisdomPoints: 3,
  //         skillBonus: "attention",
  //       },
  //     ],
  //     puzzle: {
  //       type: "logic",
  //       difficulty: 3,
  //       instructions: "Help Hanuman determine the best route to Lanka by solving this puzzle.",
  //       content: {
  //         puzzle: "logic_puzzle",
  //         clues: [
  //           "The direct path across the ocean is 100 yojanas long.",
  //           "Hanuman can leap great distances but must rest between jumps.",
  //           "There are three small islands he could use for resting.",
  //           "The eastern route has more islands but is longer overall.",
  //           "The western route has stronger winds that can either help or hinder.",
  //         ],
  //         options: [
  //           { id: 1, text: "Take the direct southern route with no stops" },
  //           { id: 2, text: "Use the eastern island chain with multiple rests" },
  //           { id: 3, text: "Take the western route with favorable winds" },
  //           { id: 4, text: "Leap from mountain peak to Lanka in one tremendous jump" },
  //         ],
  //         correctAnswer: 4,
  //       },
  //     },
  //   },
  // ]

  // Initialize game with correct font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  // Handle story choice selection
  const handleChoiceSelect = (choiceIndex) => {
    const choice = getChapters(language)[currentChapter].choices[choiceIndex]

    // Update scores based on choice
    setWisdomGained(wisdomGained + choice.wisdomPoints)

    // Update skill that gets bonus
    if (choice.skillBonus === "memory") {
      setMemoryScore(memoryScore + 1)
    } else if (choice.skillBonus === "logic") {
      setLogicScore(logicScore + 1)
    } else if (choice.skillBonus === "attention") {
      setAttentionScore(attentionScore + 1)
    }

    // Record player choice
    setPlayerChoices([
      ...playerChoices,
      {
        chapter: currentChapter,
        choiceIndex: choiceIndex,
        text: choice.text,
      },
    ])

    // Move to puzzle stage
    setCurrentStage("puzzle")
  }

  // Handle puzzle completion
  const handlePuzzleComplete = (score) => {
    // Update progress
    setProgressPoints(progressPoints + score)

    // Update skill score based on puzzle type
    const puzzleType = getChapters(language)[currentChapter].puzzle.type
    if (puzzleType === "memory") {
      setMemoryScore(memoryScore + Math.floor(score / 10))
    } else if (puzzleType === "logic" || puzzleType === "pattern") {
      setLogicScore(logicScore + Math.floor(score / 10))
    } else if (puzzleType === "attention" || puzzleType === "word") {
      setAttentionScore(attentionScore + Math.floor(score / 10))
    }

    // Move to next chapter or end game if finished
    if (currentChapter < getChapters(language).length - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentStage("story")
    } else {
      // Game completed - would show results/ending
      // For now we'll just restart
      handleRestartGame()
    }
  }

  // Game control functions
  const handleStartGame = () => {
    setGameStarted(true)
    resetGameState()
  }

  const handleRestartGame = () => {
    resetGameState()
  }

  const resetGameState = () => {
    setCurrentChapter(0)
    setCurrentStage("story")
    setProgressPoints(0)
    setWisdomGained(0)
    setMemoryScore(0)
    setLogicScore(0)
    setAttentionScore(0)
    setPlayerChoices([])
  }

  // Audio toggle
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  // Calculate cognitive skill strength
  const getStrongestSkill = () => {
    if (memoryScore >= logicScore && memoryScore >= attentionScore) {
      return "Memory"
    } else if (logicScore >= memoryScore && logicScore >= attentionScore) {
      return "Logical Thinking"
    } else {
      return "Attention to Detail"
    }
  }

  // Game intro screen
  if (!gameStarted) {
    return (
      <div
        className={cn(
          "min-h-screen flex flex-col items-center justify-center p-4",
          highContrast ? "bg-black text-white" : "bg-background text-foreground",
        )}
      >
        <Card className="w-full max-w-3xl">
          <CardContent className="p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-6">{getTranslation(language, "gameTitle")}</h1>
            <p className="text-xl text-center mb-8">{getTranslation(language, "gameSubtitle")}</p>

            <img src="/image.png?height=200&width=400" alt="Rama with bow" className="rounded-lg mb-8" />

            <div className="text-center mb-8 space-y-4">
              <p className="text-lg">{getTranslation(language, "gameDescription1")}</p>
              <p className="text-lg">{getTranslation(language, "gameDescription2")}</p>
            </div>

            <div className="flex flex-col w-full gap-4">
              <Button size="lg" className="w-full text-xl py-8" onClick={handleStartGame}>
                {getTranslation(language, "startButton")}
              </Button>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 text-lg py-6" onClick={() => setShowSettings(true)}>
                  <Settings className="mr-2" />
                  {getTranslation(language, "settingsButton")}
                </Button>

                <Button variant="outline" className="flex-1 text-lg py-6" onClick={() => setShowTutorial(true)}>
                  <HelpCircle className="mr-2" />
                  {getTranslation(language, "howToPlayButton")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {showSettings && (
          <GameSettings
            fontSize={fontSize}
            setFontSize={setFontSize}
            gameSpeed={gameSpeed}
            setGameSpeed={setGameSpeed}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            language={language}
            setLanguage={setLanguage}
            onClose={() => setShowSettings(false)}
          />
        )}

        {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} language={language} />}
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen pb-16", highContrast ? "bg-black text-white" : "bg-background text-foreground")}>
      {showSettings && (
        <GameSettings
          fontSize={fontSize}
          setFontSize={setFontSize}
          gameSpeed={gameSpeed}
          setGameSpeed={setGameSpeed}
          audioEnabled={audioEnabled}
          setAudioEnabled={setAudioEnabled}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          language={language}
          setLanguage={setLanguage}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} language={language} />}

      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{getTranslation(language, "gameTitle")}</h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleAudio} className="text-xl p-2">
              {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} className="text-xl p-2">
              <Settings size={24} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setShowTutorial(true)} className="text-xl p-2">
              <HelpCircle size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-medium">
              {getTranslation(language, "chapter")} {currentChapter + 1}: {getChapters(language)[currentChapter].title}
            </h2>
            <p className="text-muted-foreground">
              {currentStage === "story"
                ? getTranslation(language, "storyChoices")
                : getTranslation(language, "cognitiveChallenge")}
            </p>
          </div>

          <div className="flex gap-4 text-right">
            <div>
              <p className="font-medium">{getTranslation(language, "wisdom")}</p>
              <p className="text-xl">{wisdomGained}</p>
            </div>
            <div>
              <p className="font-medium">{getTranslation(language, "progress")}</p>
              <p className="text-xl">{progressPoints}</p>
            </div>
          </div>
        </div>

        {currentStage === "story" ? (
          <StoryChoice
            chapter={getChapters(language)[currentChapter]}
            onChoiceSelect={handleChoiceSelect}
            audioEnabled={audioEnabled}
            language={language}
          />
        ) : (
          <CognitivePuzzle
            puzzle={getChapters(language)[currentChapter].puzzle}
            gameSpeed={gameSpeed}
            onComplete={handlePuzzleComplete}
            language={language}
          />
        )}

        <div className="mt-8 bg-primary/10 rounded-lg p-4">
          <h3 className="text-xl font-medium mb-2">{getTranslation(language, "cognitiveSkills")}</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="font-medium">{getTranslation(language, "memory")}</p>
              <p className="text-2xl">{memoryScore}</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{getTranslation(language, "logic")}</p>
              <p className="text-2xl">{logicScore}</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{getTranslation(language, "attention")}</p>
              <p className="text-2xl">{attentionScore}</p>
            </div>
          </div>
          <p className="text-center">
            {getTranslation(language, "strongestSkill")} <span className="font-bold">{getStrongestSkill()}</span>
          </p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>
            {getTranslation(language, "chapter")} {currentChapter + 1} {getTranslation(language, "of")}{" "}
            {getChapters(language).length}
          </p>

          <Button variant="outline" onClick={handleRestartGame}>
            {getTranslation(language, "restart")}
          </Button>
        </div>
      </footer>
    </div>
  )
}

