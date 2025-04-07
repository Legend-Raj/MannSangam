"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface GameSettingsProps {
  fontSize: number
  setFontSize: (value: number) => void
  gameSpeed: number
  setGameSpeed: (value: number) => void
  audioEnabled: boolean
  setAudioEnabled: (value: boolean) => void
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  language: string
  setLanguage: (value: string) => void
  onClose: () => void
}

export default function GameSettings({
  fontSize,
  setFontSize,
  gameSpeed,
  setGameSpeed,
  audioEnabled,
  setAudioEnabled,
  highContrast,
  setHighContrast,
  language,
  setLanguage,
  onClose,
}: GameSettingsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X size={24} />
        </Button>

        <h2 className="text-3xl font-bold mb-6">Settings</h2>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Text Size</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">A</span>
              <Slider
                value={[fontSize]}
                min={16}
                max={24}
                step={1}
                className="w-[60%]"
                onValueChange={(value) => setFontSize(value[0])}
              />
              <span className="text-2xl">A</span>
            </div>
            <div className="text-center">Current: {fontSize}pt</div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Challenge Speed</h3>
            <div className="flex items-center justify-between">
              <span>Slow</span>
              <Slider
                value={[gameSpeed]}
                min={0.5}
                max={2}
                step={0.1}
                className="w-[60%]"
                onValueChange={(value) => setGameSpeed(value[0])}
              />
              <span>Fast</span>
            </div>
            <div className="text-center">Current: {gameSpeed.toFixed(1)}x</div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Accessibility</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="audio" className="text-lg">
                  Audio
                </Label>
                <Switch id="audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="contrast" className="text-lg">
                  High Contrast
                </Label>
                <Switch id="contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Language / भाषा</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant={language === "english" ? "default" : "outline"}
                className="flex-1 py-6 text-lg"
                onClick={() => setLanguage("english")}
              >
                English
              </Button>
              <Button
                variant={language === "hindi" ? "default" : "outline"}
                className="flex-1 py-6 text-lg"
                onClick={() => setLanguage("hindi")}
              >
                हिंदी
              </Button>
            </div>
          </div>

          <Button className="w-full text-xl py-6" onClick={onClose}>
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}

