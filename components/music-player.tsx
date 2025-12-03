"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [hasAudio, setHasAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const checkAndPlayAudio = async () => {
      if (audioRef.current?.src) {
        try {
          const response = await fetch(audioRef.current.src, { method: "HEAD" })
          if (response.ok) {
            setHasAudio(true)
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true)
                })
                .catch(() => {
                  console.log("Autoplay bloqueado. Clique no player para iniciar a música.")
                })
            }
          }
        } catch (error) {
          console.log("Arquivo de áudio não encontrado. Adicione uma música em /public/wedding-music.mp3")
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
        audioRef.current.play().catch(() => {
          console.log("Não foi possível reproduzir o áudio")
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

  // Não renderizar player se não tiver arquivo de áudio
  if (!hasAudio && !audioRef.current?.src) {
    return null
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

      {/* Elemento de áudio */}
      <audio ref={audioRef} src="/wedding-music.mp3" loop crossOrigin="anonymous" />
    </div>
  )
}
