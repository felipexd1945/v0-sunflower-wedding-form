interface SunflowerAnimationProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

const sizeMap = {
  sm: { container: 60, petal: 6, petals: 20 },
  md: { container: 100, petal: 10, petals: 28 },
  lg: { container: 140, petal: 14, petals: 36 },
}

export default function SunflowerAnimation({ size = "md", animated = true }: SunflowerAnimationProps) {
  const config = sizeMap[size]
  const radius = config.container / 2

  return (
    <div
      className={animated ? "animate-sway" : ""}
      style={{
        width: config.container,
        height: config.container,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: config.petals }).map((_, i) => {
        const angle = (i / config.petals) * Math.PI * 2
        const x = Math.cos(angle) * (radius * 0.7)
        const y = Math.sin(angle) * (radius * 0.7)
        const rotation = (i / config.petals) * 360

        // Variação de cores mais natural
        const colorIndex = i % 4
        const gradients = [
          { start: "#FDB927", mid: "#FFD93D", end: "#F4C430" },
          { start: "#FFD93D", mid: "#FDB927", end: "#F4C430" },
          { start: "#F4C430", mid: "#FFD93D", end: "#FDB927" },
          { start: "#FFC700", mid: "#FFD93D", end: "#F4C430" },
        ]
        const gradient = gradients[colorIndex]

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: config.petal,
              height: config.petal * 2.8,
              background: `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.mid} 50%, ${gradient.end} 100%)`,
              borderRadius: "50% 50% 40% 40%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`,
              boxShadow: `0 4px 8px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(0,0,0,0.1)`,
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.08))",
            }}
          />
        )
      })}

      <div
        style={{
          position: "absolute",
          width: radius * 0.5,
          height: radius * 0.5,
          backgroundColor: "#8B6F47",
          borderRadius: "50%",
          backgroundImage: `
            radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3) 0%, transparent 40%),
            radial-gradient(circle, #8B6F47 0%, #6B5638 70%, #5A4830 100%)
          `,
          zIndex: 10,
          boxShadow: "0 6px 12px rgba(0,0,0,0.25), inset 0 2px 4px rgba(0,0,0,0.2)",
          border: "2px solid rgba(107, 86, 56, 0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: size === "sm" ? 12 : size === "md" ? 20 : 32 }).map((_, i) => {
            const seedAngle = (i / (size === "sm" ? 12 : size === "md" ? 20 : 32)) * Math.PI * 2
            const seedRadius = (i / (size === "sm" ? 12 : size === "md" ? 20 : 32)) * 40
            const seedX = 50 + Math.cos(seedAngle) * seedRadius * 0.3
            const seedY = 50 + Math.sin(seedAngle) * seedRadius * 0.3

            return (
              <div
                key={`seed-${i}`}
                style={{
                  position: "absolute",
                  width: size === "sm" ? 2 : size === "md" ? 3 : 4,
                  height: size === "sm" ? 2 : size === "md" ? 3 : 4,
                  backgroundColor: `rgba(0,0,0,${0.2 + Math.random() * 0.3})`,
                  borderRadius: "50%",
                  left: `${seedX}%`,
                  top: `${seedY}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 1px 2px rgba(0,0,0,0.2)`,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
