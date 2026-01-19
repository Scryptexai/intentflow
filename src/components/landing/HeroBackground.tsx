import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

interface ProofCard {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  delay: number;
}

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // Center verification node position
  const centerX = useRef(0);
  const centerY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      centerX.current = canvas.offsetWidth / 2;
      centerY.current = canvas.offsetHeight / 2;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles from edges
    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        particles.push(createParticle(canvas.offsetWidth, canvas.offsetHeight));
      }
      particlesRef.current = particles;
    };

    const createParticle = (width: number, height: number): Particle => {
      // Spawn from edges
      const edge = Math.floor(Math.random() * 4);
      let x, y;
      
      switch (edge) {
        case 0: // top
          x = Math.random() * width;
          y = -10;
          break;
        case 1: // right
          x = width + 10;
          y = Math.random() * height;
          break;
        case 2: // bottom
          x = Math.random() * width;
          y = height + 10;
          break;
        default: // left
          x = -10;
          y = Math.random() * height;
      }

      return {
        id: Math.random(),
        x,
        y,
        vx: 0,
        vy: 0,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 2 + 1,
      };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw verification node (center glow)
      const gradient = ctx.createRadialGradient(
        centerX.current,
        centerY.current,
        0,
        centerX.current,
        centerY.current,
        80
      );
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.15)");
      gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.05)");
      gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
      
      ctx.beginPath();
      ctx.arc(centerX.current, centerY.current, 80, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw inner core
      const coreGradient = ctx.createRadialGradient(
        centerX.current,
        centerY.current,
        0,
        centerX.current,
        centerY.current,
        20
      );
      coreGradient.addColorStop(0, "rgba(0, 255, 255, 0.4)");
      coreGradient.addColorStop(1, "rgba(0, 255, 255, 0.1)");
      
      ctx.beginPath();
      ctx.arc(centerX.current, centerY.current, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Calculate direction to center
        const dx = centerX.current - particle.x;
        const dy = centerY.current - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Accelerate towards center
        const speed = 0.8 + (1 - dist / 500) * 1.5;
        particle.vx = (dx / dist) * speed;
        particle.vy = (dy / dist) * speed;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle trail
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.vx * 8, particle.y - particle.vy * 8);
        ctx.lineTo(particle.x, particle.y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${particle.opacity * 0.5})`;
        ctx.lineWidth = particle.size * 0.5;
        ctx.stroke();

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Reset particle when it reaches center
        if (dist < 25) {
          particlesRef.current[index] = createParticle(width, height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Proof cards that emerge from center
  const proofCards: ProofCard[] = [
    { id: 1, x: 120, y: -80, opacity: 0.6, scale: 1, delay: 0 },
    { id: 2, x: 150, y: 20, opacity: 0.5, scale: 0.9, delay: 0.5 },
    { id: 3, x: 100, y: 100, opacity: 0.4, scale: 0.8, delay: 1 },
    { id: 4, x: -140, y: -60, opacity: 0.5, scale: 0.85, delay: 1.5 },
    { id: 5, x: -160, y: 50, opacity: 0.45, scale: 0.75, delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(0.5px)" }}
      />

      {/* Proof cards emerging from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {proofCards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute"
            style={{
              left: `calc(50% + ${card.x}px)`,
              top: `calc(50% + ${card.y}px)`,
            }}
            initial={{ opacity: 0, scale: 0.5, x: -card.x, y: -card.y }}
            animate={{
              opacity: [0, card.opacity, card.opacity, 0],
              scale: [0.5, card.scale, card.scale, 0.8],
              x: [0, 0, 0, card.x * 0.3],
              y: [0, 0, 0, card.y * 0.3],
            }}
            transition={{
              duration: 8,
              delay: card.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-16 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 backdrop-blur-sm"
              style={{ 
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
              }}
            >
              {/* Card content lines */}
              <div className="p-2 space-y-1">
                <div className="h-1 w-8 bg-primary/40 rounded" />
                <div className="h-1 w-6 bg-primary/30 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle radial overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 20%, hsl(var(--background)) 70%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
