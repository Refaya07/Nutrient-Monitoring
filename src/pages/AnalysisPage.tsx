import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ScrollReveal from "../components/ScrollReveal";
import { Parallax } from "react-scroll-parallax";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { waktu: "08:00", EC: 1.2, pH: 6.5, suhu: 25.0 },
  { waktu: "09:00", EC: 1.3, pH: 6.8, suhu: 25.4 },
  { waktu: "10:00", EC: 1.25, pH: 6.7, suhu: 25.8 },
  { waktu: "11:00", EC: 1.4, pH: 6.9, suhu: 26.1 },
];

const radarData = data.map((item) => ({
  waktu: item.waktu,
  EC: item.EC,
  pH: item.pH,
  suhu: item.suhu,
}));

export default function AnalysisPage() {
  const [mode, setMode] = useState<"line" | "bar" | "area" | "radar">("line");
  const chartRef = useRef<HTMLDivElement>(null);

  const renderChart = () => {
    if (mode === "bar") {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="waktu" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="EC" fill="#10b981" />
          <Bar dataKey="pH" fill="#3b82f6" />
          <Bar dataKey="suhu" fill="#facc15" />
        </BarChart>
      );
    }

    if (mode === "area") {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="waktu" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="suhu"
            stroke="#facc15"
            fillOpacity={1}
            fill="url(#colorSuhu)"
          />
        </AreaChart>
      );
    }

    if (mode === "radar") {
      return (
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="waktu" />
          <PolarRadiusAxis />
          <Radar
            name="EC"
            dataKey="EC"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
          <Radar
            name="pH"
            dataKey="pH"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Radar
            name="Suhu"
            dataKey="suhu"
            stroke="#facc15"
            fill="#facc15"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      );
    }

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
        <XAxis dataKey="waktu" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="EC" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="pH" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="suhu" stroke="#facc15" strokeWidth={2} />
      </LineChart>
    );
  };

  const handleDownload = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.download = `grafik-nutrisi-${mode}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div style={{ color: "#ffffff" }} className="flex-1 p-6 sm:p-10">
      <h2 className="text-3xl font-bold mb-6">Analisis Data Nutrien</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <ScrollReveal>
          <Parallax speed={-5}>
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: "#1f2937", // bg-gray-800
                borderLeft: "4px solid #10b981",
              }}
            >
              <h3 className="text-xl font-semibold mb-2">EC</h3>
              <p className="text-3xl font-bold">
                1.23 <span className="text-base">mS/cm</span>
              </p>
            </div>
          </Parallax>
        </ScrollReveal>

        <ScrollReveal>
          <Parallax speed={-5}>
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: "#1f2937",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              <h3 className="text-xl font-semibold mb-2">pH</h3>
              <p className="text-3xl font-bold">6.80</p>
            </div>
          </Parallax>
        </ScrollReveal>

        <ScrollReveal>
          <Parallax speed={-5}>
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: "#1f2937",
                borderLeft: "4px solid #facc15",
              }}
            >
              <h3 className="text-xl font-semibold mb-2">Suhu</h3>
              <p className="text-3xl font-bold">
                25.4 <span className="text-base">°C</span>
              </p>
            </div>
          </Parallax>
        </ScrollReveal>
      </div>

      {/* Mode Selector + Download */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <label htmlFor="chartMode" className="mr-4 font-medium text-lg">
            Mode Grafik:
          </label>
          <select
            id="chartMode"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="area">Area Chart</option>
            <option value="radar">Radar Chart</option>
          </select>
        </div>

        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 transition-all px-6 py-2 rounded-lg text-white font-semibold"
        >
          Download Grafik
        </button>
      </div>

      {/* Chart Container */}
      <div
        ref={chartRef}
        className="p-6 rounded-xl shadow-lg"
        style={{ backgroundColor: "#111827" }} // bg-gray-900
        id="chart-container"
      >
        <ResponsiveContainer width="100%" height={350}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
