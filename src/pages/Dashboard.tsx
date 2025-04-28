// src/pages/Dashboard.tsx
import HeroSection from "../components/HeroSection";
import SensorCard from "../components/SensorCard";
import ScrollReveal from "../components/ScrollReveal";

export default function Dashboard() {
  return (
    <>
      <HeroSection />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 max-w-5xl mx-auto">
        <ScrollReveal>
          <SensorCard
            label="EC"
            value="1.23"
            unit="mS/cm"
            color="border-green-400"
          />
        </ScrollReveal>
        <ScrollReveal>
          <SensorCard label="pH" value="6.80" unit="" color="border-blue-400" />
        </ScrollReveal>
        <ScrollReveal>
          <SensorCard
            label="Suhu"
            value="25.4"
            unit="°C"
            color="border-yellow-400"
          />
        </ScrollReveal>
      </div>
    </>
  );
}
