"use client"

import type React from "react"
import Countdown from "@/components/countdown"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Check, ChevronDown } from "lucide-react"
import SunflowerAnimation from "@/components/sunflower-animation"
import MusicPlayer from "@/components/music-player"

export default function RSVPPage() {
  const [step, setStep] = useState("form")
  const [expandComodities, setExpandComodities] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "yes",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao salvar confirmação")
      }

      setStep("success")
      setTimeout(() => {
        setStep("form")
        setFormData({
          name: "",
          email: "",
          phone: "",
          attendance: "yes",
          message: "",
        })
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Girassóis decorativos de fundo */}
      <div className="absolute top-10 left-10 opacity-25 animate-float">
        <SunflowerAnimation size="lg" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-sway" style={{ animationDelay: "0.5s" }}>
        <SunflowerAnimation size="md" />
      </div>
      <div className="absolute top-1/3 right-5 opacity-15 animate-float" style={{ animationDelay: "1s" }}>
        <SunflowerAnimation size="sm" />
      </div>
      <div className="absolute top-1/4 left-1/4 opacity-18 animate-sway" style={{ animationDelay: "1.5s" }}>
        <SunflowerAnimation size="md" />
      </div>
      <div className="absolute bottom-1/3 left-5 opacity-22 animate-float" style={{ animationDelay: "0.8s" }}>
        <SunflowerAnimation size="md" />
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-16 animate-sway" style={{ animationDelay: "2s" }}>
        <SunflowerAnimation size="lg" />
      </div>
      <div className="absolute bottom-10 right-1/3 opacity-20 animate-float" style={{ animationDelay: "1.2s" }}>
        <SunflowerAnimation size="sm" />
      </div>
      <div className="absolute top-2/3 left-1/3 opacity-18 animate-sway" style={{ animationDelay: "0.3s" }}>
        <SunflowerAnimation size="md" />
      </div>

      <MusicPlayer />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {step === "form" ? (
          <Card className="w-full max-w-2xl shadow-xl border-0">
            <div className="relative overflow-hidden rounded-lg">
              {/* Header com girassol */}
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-300 p-8 text-center relative">
                <div className="absolute top-0 left-0 right-0 flex justify-center gap-8 opacity-15 animate-float">
                  <SunflowerAnimation size="sm" />
                  <SunflowerAnimation size="sm" />
                  <SunflowerAnimation size="sm" />
                </div>
                <div className="relative z-10">
                  <div className="inline-block mb-4 animate-bloom">
                    <SunflowerAnimation size="md" />
                  </div>
                  <h1 className="text-4xl font-script font-bold text-amber-900 mb-2 text-pretty">Isabelle & Felipe</h1>
                  <p className="text-amber-800 text-lg">No tempo perfeito de Deus dois caminhos se tornam um só!</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-8 border-t-2 border-yellow-200">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Mensagem de boas-vindas */}
                  <div className="text-center">
                    <p className="text-lg text-amber-900 font-medium leading-relaxed">
                      É com prazer que convidamos vocês para a comemoração da oficialização do nosso casamento. 💛
                    </p>
                  </div>

                  {/* Detalhes do evento */}
                  <div className="bg-white rounded-lg p-8 border-2 border-yellow-200 shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-amber-900 mb-6">📍 Casarão - Itaim Paulista</h3>

                    {/* Data em destaque */}
                    <p className="text-4xl font-bold text-yellow-600 mb-4">25/01/2026 - 12h00</p>

                    {/* Countdown */}
                    <div className="mb-6">
                      <Countdown targetDate="2026-01-25" />
                    </div>

                    {/* Endereço */}
                    <a
                      href="https://maps.google.com/?q=Rua+Eurides+Fernandes+do+Nascimento,+353,+Itaim+Paulista,+São+Paulo,+SP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 text-base leading-relaxed hover:text-yellow-600 hover:underline transition-colors cursor-pointer inline-block"
                    >
                      Rua Eurides Fernandes do Nascimento, 353
                      <br />
                      Itaim Paulista - São Paulo, SP
                      <br />
                      <span className="text-sm text-yellow-600 font-medium">🗺️ Ver no Google Maps</span>
                    </a>
                  </div>

                  {/* Observações */}
                  <div className="bg-amber-50 rounded-lg border-2 border-amber-200 overflow-hidden">
                    <button
                      onClick={() => setExpandComodities(!expandComodities)}
                      className="w-full p-6 flex items-center justify-between hover:bg-amber-100 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">✨ Comodidades</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-900 transition-transform ${
                          expandComodities ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandComodities && (
                      <div className="px-6 pb-6 pt-0 border-t-2 border-amber-200">
                        <ul className="space-y-2 text-amber-800">
                          <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                            Estacionamento disponível
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                            Piscina para aproveitar o dia
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="flex items-center gap-2 mb-8">
                  <Heart className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-xl font-semibold text-amber-900">Seus Detalhes</h2>
                </div>
                <p className="text-amber-800 text-lg">Confirme sua presença em nosso dia de celebração</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white text-amber-900"
                      placeholder="João da Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white text-amber-900"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Telefone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white text-amber-900"
                    placeholder="(00) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-3">Confirma sua presença? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={formData.attendance === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-yellow-500"
                      />
                      <span className="text-amber-900">✨ Vou estar lá!</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={formData.attendance === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-yellow-500"
                      />
                      <span className="text-amber-900">Infelizmente não poderei</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Mensagem para os Recém Casados
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white text-amber-900 resize-none"
                    placeholder="Deixe sua mensagem aqui..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-amber-900 font-semibold text-lg h-12 rounded-lg shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {isLoading ? "Salvando..." : "Confirmar Presença"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        ) : (
          <Card className="w-full max-w-md text-center p-8 shadow-xl border-0">
            <div className="mb-6 flex justify-center">
              <div className="animate-bloom">
                <SunflowerAnimation size="lg" />
              </div>
            </div>
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full">
              <Check className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-2">Obrigado!</h2>
            <p className="text-amber-700 mb-4">Sua confirmação foi recebida com sucesso. Nos vemos em breve!</p>
            <p className="text-sm text-amber-600">Um email de confirmação foi enviado para {formData.email}</p>
          </Card>
        )}
      </div>
    </div>
  )
}
