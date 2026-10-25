"use strict";
import React, { useState } from "react";
import {
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import { renderQRCodeToCanvas } from "@/lib/qr-generator";
import { exportQRCodeToPDF } from "@/lib/pdf-export";

interface ExportBarProps {
  canvasElement: HTMLCanvasElement | null;
  qrConfig: QRConfig;
  logoConfig: LogoConfig;
  mode: ModeType;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  canvasElement,
  qrConfig,
  logoConfig,
  mode,
}) => {
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportResolution, setExportResolution] = useState<number>(2048);
  const [showResMenu, setShowResMenu] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#0284c7", "#0369a1", "#000000"], // Strict brand colors
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const handleDownloadImage = async () => {
    setIsExportingImage(true);
    try {
      // Render to an off-screen high-resolution canvas
      const offscreenCanvas = document.createElement("canvas");
      await renderQRCodeToCanvas({
        canvas: offscreenCanvas,
        qrConfig,
        logoConfig,
        mode,
        targetSize: exportResolution,
      });

      const dataUrl = offscreenCanvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const cleanName = "Myqrmake_" + (mode === "qr-with-logo" ? "CustomLogo" : "QR") + "_" + exportResolution + "px.png";
      link.download = cleanName;
      link.href = dataUrl;
      link.click();

      triggerCelebration();
      setSuccessToast(`Downloaded ${exportResolution}px PNG!`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      console.error("Export image error:", err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      // Render to a crisp 2048px offscreen canvas for PDF embedding
      const offscreenCanvas = document.createElement("canvas");
      await renderQRCodeToCanvas({
        canvas: offscreenCanvas,
        qrConfig,
        logoConfig,
        mode,
        targetSize: 2048,
      });

      exportQRCodeToPDF({
        canvas: offscreenCanvas,
        qrConfig,
        logoConfig,
        mode,
        filename: "Myqrmake_Document_2026.pdf",
      });

      triggerCelebration();
      setSuccessToast("Generated Professional PDF Document!");
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      console.error("Export PDF error:", err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Toast feedback */}
      {successToast && (
        <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-sea text-white text-xs font-semibold shadow-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option 1: High Resolution Image Download */}
        <div className="relative flex">
          <button
            type="button"
            disabled={isExportingImage}
            onClick={handleDownloadImage}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-l-xl bg-sea text-white font-semibold text-sm hover:bg-sea-700 active:bg-sea-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isExportingImage ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-white" />
            )}
            <span>Download High Resolution Image</span>
          </button>

          {/* Resolution Selector Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowResMenu((prev) => !prev)}
              className="h-full px-2.5 rounded-r-xl bg-sea-700 text-white border-l border-white/20 hover:bg-sea-800 transition-colors flex items-center justify-center"
              title="Select resolution"
            >
              <span className="text-[10px] font-mono font-bold mr-1">
                {exportResolution >= 2048 ? `${exportResolution / 1024}K` : "1K"}
              </span>
              <ChevronDown className="w-3 h-3 text-white" />
            </button>

            {showResMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-44 rounded-xl border border-black/15 bg-white shadow-xl p-1.5 z-50">
                <p className="text-[10px] font-bold text-black/50 px-2.5 py-1 uppercase tracking-wider">
                  Select Resolution
                </p>
                {[
                  { res: 1024, label: "1024 × 1024 (1K Web)" },
                  { res: 2048, label: "2048 × 2048 (2K Print)" },
                  { res: 4096, label: "4096 × 4096 (4K Ultra)" },
                ].map((item) => (
                  <button
                    key={item.res}
                    type="button"
                    onClick={() => {
                      setExportResolution(item.res);
                      setShowResMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      exportResolution === item.res
                        ? "bg-sea-50 text-sea-800 font-bold"
                        : "text-black/80 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Option 2: Professional PDF Document Export */}
        <button
          type="button"
          disabled={isExportingPDF}
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-black text-white font-semibold text-sm hover:bg-black/85 active:scale-[0.99] transition-all shadow-sm disabled:opacity-50 cursor-pointer border border-black"
        >
          {isExportingPDF ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FileText className="w-4 h-4 text-sea-300" />
          )}
          <span>Export Professional PDF</span>
        </button>
      </div>
    </div>
  );
};
