"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const checkAndPlayAudio = async () => {
      if (audioRef.current) {
        try {
          console.log("[v0] Audio ref disponível, tentando reproduzir...")
          console.log("[v0] Src do áudio:", audioRef.current.src)

          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("[v0] Música iniciou com sucesso!")
                setIsPlaying(true)
              })
              .catch((error) => {
                console.log("[v0] Autoplay bloqueado ou erro:", error.message)
              })
          }
        } catch (error) {
          console.log("[v0] Erro ao carregar áudio:", error)
        }
      }
    }

    const timer = setTimeout(checkAndPlayAudio, 500)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch((error) => {
          console.log("[v0] Erro ao reproduzir:", error.message)
        })
        setIsPlaying(true)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg p-4 flex items-center gap-3 backdrop-blur-sm border border-amber-100">
      {/* Botão Play/Pause */}
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-amber-50 rounded-full transition-colors"
        title={isPlaying ? "Pausar" : "Reproduzir"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-yellow-600 fill-yellow-600" />
        ) : (
          <Play className="w-5 h-5 text-yellow-600 fill-yellow-600" />
        )}
      </button>

      {/* Controle de Volume */}
      <div className="flex items-center gap-2">
        {volume === 0 ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-yellow-600" />}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-yellow-500"
        />
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B-Instrumental-VQKSHPETS2ByC4pdEVPtcQmBU95JDF.mp3"
        loop
        crossOrigin="anonymous"
        onLoadedMetadata={() => console.log("[v0] Áudio carregado com metadados")}
        onError={(e) => console.log("[v0] Erro ao carregar áudio:", e)}
        onCanPlay={() => console.log("[v0] Áudio pronto para reprodução")}
      />
    </div>
  )
}
