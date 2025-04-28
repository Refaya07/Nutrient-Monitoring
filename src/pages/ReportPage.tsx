// src/pages/ReportPage.tsx

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { Parallax } from "react-scroll-parallax";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const dummyData = [
  { waktu: "08:00", EC: 1.2, pH: 6.5, suhu: 25.0 },
  { waktu: "09:00", EC: 1.3, pH: 6.8, suhu: 25.4 },
  { waktu: "10:00", EC: 1.25, pH: 6.7, suhu: 25.8 },
  { waktu: "11:00", EC: 1.4, pH: 6.9, suhu: 26.1 },
  { waktu: "12:00", EC: 1.35, pH: 7.0, suhu: 26.4 },
];

export default function ReportPage() {
  const [search, setSearch] = useState("");
  const [filterTime, setFilterTime] = useState("all");

  const filteredData = dummyData.filter((item) => {
    const matchSearch =
      item.waktu.includes(search) ||
      item.EC.toString().includes(search) ||
      item.pH.toString().includes(search) ||
      item.suhu.toString().includes(search);
    const matchFilter =
      filterTime === "all" || item.waktu.startsWith(filterTime);
    return matchSearch && matchFilter;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Data Nutrien", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text("PT. Contoh Perusahaan - Divisi Monitoring Nutrisi", 105, 28, {
      align: "center",
    });

    autoTable(doc, {
      head: [["Waktu", "EC (mS/cm)", "pH", "Suhu (°C)"]],
      body: filteredData.map((row) => [
        row.waktu,
        row.EC.toString(),
        row.pH.toString(),
        row.suhu.toString(),
      ]),
      startY: 40,
      styles: {
        halign: "center",
        fontSize: 10,
      },
      headStyles: {
        fillColor: [41, 128, 185],
      },
    });

    doc.save("laporan-nutrisi.pdf");
  };

  return (
    <div className="flex-1 p-6 sm:p-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Laporan Data Nutrien
      </h2>

      {/* Filter + Search + Export */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 w-full sm:w-auto"
          />

          <select
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2"
          >
            <option value="all">Semua Waktu</option>
            <option value="08">Jam 08</option>
            <option value="09">Jam 09</option>
            <option value="10">Jam 10</option>
            <option value="11">Jam 11</option>
            <option value="12">Jam 12</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={exportToPDF}
            className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-2 rounded-lg text-white font-semibold"
          >
            Ekspor PDF
          </button>
        </div>
      </div>

      <ScrollReveal>
        <Parallax speed={-5}>
          <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl ring-1 ring-gray-700">
            <table className="min-w-full text-sm sm:text-base text-left table-auto border-separate border-spacing-y-3">
              <thead>
                <tr className="bg-gray-800/70 backdrop-blur-sm text-white rounded-lg">
                  <th className="px-6 py-3 rounded-l-xl">Waktu</th>
                  <th className="px-6 py-3">EC (mS/cm)</th>
                  <th className="px-6 py-3">pH</th>
                  <th className="px-6 py-3 rounded-r-xl">Suhu (°C)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="transition duration-300 hover:scale-[1.01] hover:shadow-xl bg-gray-700/60 backdrop-blur-md text-white rounded-xl"
                    >
                      <td className="px-6 py-4 rounded-l-xl">{item.waktu}</td>
                      <td className="px-6 py-4">{item.EC}</td>
                      <td className="px-6 py-4">{item.pH}</td>
                      <td className="px-6 py-4 rounded-r-xl">{item.suhu}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Parallax>
      </ScrollReveal>
    </div>
  );
}
