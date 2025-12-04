"use client"

interface SunflowerAnimationProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

const sizeMap = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 160, height: 160 },
}

export default function SunflowerAnimation({ size = "md", animated = true }: SunflowerAnimationProps) {
  const config = sizeMap[size]

  return (
    <div
      className={animated ? "animate-sway" : ""}
      style={{
        width: config.width,
        height: config.height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/sunflower.png"
        alt="Girassol decorativo"
        onLoad={() => console.log("[v0] Girassol carregado com sucesso")}
        onError={(e) => console.log("[v0] Erro ao carregar girassol:", e)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
        }}
      />
    </div>
  )
}
