import ScrollReveal from "./ScrollReveal";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050505] to-[#111827]">
      {/* Ornamen background SVG */}
      <Parallax speed={-20}>
        <img
          src="/gambar1.svg"
          alt="Tech SVG"
          className="absolute w-64 sm:w-80 top-10 left-10 opacity-30 z-0 pointer-events-none"
        />
      </Parallax>

      {/* Ornamen kotak teknologi */}
      <Parallax speed={10}>
        <div className="absolute w-40 h-40 bg-cyan-400/10 border border-cyan-500/30 rounded-lg top-10 right-10 shadow-[0_0_20px_#22d3ee33] z-0" />
      </Parallax>

      {/* Konten utama */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-center text-center px-4 py-32 min-h-screen relative z-10 space-y-6">
          <Parallax speed={-20}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-6xl font-bold tracking-wide text-white"
            >
              Nutrient Monitoring Dashboard
            </motion.h1>
          </Parallax>

          <Parallax speed={88}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg"
            >
              Pantau nilai EC, pH, dan suhu larutanmu secara real-time dengan
              gaya luar angkasa & teknologi.
            </motion.p>
          </Parallax>
        </div>
      </ScrollReveal>
    </div>
  );
}
