"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { ModeToggle } from "@/components/ModeToggle";
import { InputPanel } from "@/components/InputPanel";
import { LogoPanel } from "@/components/LogoPanel";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { ExportBar } from "@/components/ExportBar";
import { Footer } from "@/components/Footer";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import {
  Sparkles,
  Info,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

const SAMPLE_LOGO_DATA_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23000000'/><circle cx='50' cy='50' r='28' fill='%230284c7'/><path d='M38 50 L46 58 L62 40' stroke='%23ffffff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>";

const DEFAULT_QR_CONFIG: QRConfig = {
  content: "",
  errorCorrectionLevel: "H",
  moduleStyle: "square",
  eyeStyle: "square",
  darkColor: "#000000",
  lightColor: "#ffffff",
  margin: 2,
};

const DEFAULT_LOGO_CONFIG: LogoConfig = {
  file: null,
  dataUrl: null,
  name: "Brand Logo",
  sizeBytes: 0,
  width: 500,
  height: 500,
  position: "center",
  scale: 0.2,
  shape: "rounded",
  padding: 8,
};

export default function Home() {
  const [mode, setMode] = useState<ModeType>("only-qr");
  const [qrConfig, setQRConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(DEFAULT_LOGO_CONFIG);
  const [activeCanvas, setActiveCanvas] = useState<HTMLCanvasElement | null>(null);

  // Handle QR config changes
  const handleQRChange = useCallback((updated: Partial<QRConfig>) => {
    setQRConfig((prev) => ({ ...prev, ...updated }));
  }, []);

  // Handle Logo config changes
  const handleLogoChange = useCallback((updated: Partial<LogoConfig>) => {
    setLogoConfig((prev) => ({ ...prev, ...updated }));
  }, []);

  // Clear logo
  const handleClearLogo = useCallback(() => {
    setLogoConfig(DEFAULT_LOGO_CONFIG);
  }, []);

  // Reset all
  const handleReset = useCallback(() => {
    setQRConfig(DEFAULT_QR_CONFIG);
    setLogoConfig(DEFAULT_LOGO_CONFIG);
    setMode("only-qr");
  }, []);

  // Mode change handler with automatic logo loading
  const handleModeChange = useCallback(
    (newMode: ModeType) => {
      setMode(newMode);
      if (newMode === "qr-with-logo" && !logoConfig.dataUrl) {
        setLogoConfig({
          file: null,
          dataUrl: "/logo_square.png",
          name: "logo_square.png",
          sizeBytes: 132465,
          width: 512,
          height: 512,
          position: "center",
          scale: 0.22,
          shape: "rounded",
          padding: 8,
        });
      }
    },
    [logoConfig.dataUrl]
  );

  // Load sample logo helper
  const handleLoadSampleLogo = () => {
    handleModeChange("qr-with-logo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-sea selection:text-white">
      {/* Top Navbar */}
      <Navbar onReset={handleReset} />

      {/* Hero Intro */}
      <section className="border-b border-black/10 bg-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
                MyQR Make
              </h1>
              <p className="text-sm sm:text-base text-black/60 max-w-2xl mt-1.5">
                Generate high precision QR codes with seamless logo positioning and instant high resolution image and PDF export.
              </p>
            </div>

            {/* Quick action: Sample logo */}
            <div className="flex items-center gap-2">
              {mode === "only-qr" ? (
                <button
                  type="button"
                  onClick={handleLoadSampleLogo}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-black/20 bg-white hover:border-sea hover:text-sea text-xs font-semibold text-black transition-all shadow-subtle active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sea" />
                  <span>Try Mode 2 with Sample Logo</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-sea" />
                  <span>Custom Logo Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mode Toggle & Customization Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Mode Selector Menu */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-black uppercase">
                  Choose QR Code Style
                </span>
                <span className="text-[11px] font-mono text-black/50">
                  {mode === "only-qr" ? "Clean Standard QR" : "Custom Logo QR"}
                </span>
              </div>
              <ModeToggle currentMode={mode} onModeChange={handleModeChange} />
            </div>

            {/* 2. Control Panels in Card */}
            <div className="p-6 rounded-2xl border border-black/15 bg-white shadow-card space-y-6">
              {/* Input & QR Grid Customization with Logo Panel right below Section 1 */}
              <InputPanel
                config={qrConfig}
                onChange={handleQRChange}
                hasLogo={mode === "qr-with-logo"}
              >
                {mode === "qr-with-logo" && (
                  <LogoPanel
                    config={logoConfig}
                    onChange={handleLogoChange}
                    onClear={handleClearLogo}
                  />
                )}
              </InputPanel>
            </div>
          </div>

          {/* Right Column: Sticky Live Preview & Dual Export Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Live Canvas Card */}
            <div className="p-6 rounded-2xl border border-black/15 bg-white shadow-card space-y-6">
              <PreviewCanvas
                qrConfig={qrConfig}
                logoConfig={logoConfig}
                mode={mode}
                onCanvasReady={setActiveCanvas}
              />

              {/* Dual Export Options */}
              <div className="pt-4 border-t border-black/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider text-black uppercase">
                    Dual Export Studio
                  </span>
                  <span className="text-[11px] font-medium text-sea">
                    Print Ready
                  </span>
                </div>
                <ExportBar
                  canvasElement={activeCanvas}
                  qrConfig={qrConfig}
                  logoConfig={logoConfig}
                  mode={mode}
                />
              </div>
            </div>

            {/* Friendly Scannability Information */}
            <div className="p-4 rounded-xl border border-black/10 bg-white space-y-2 text-xs text-black/70">
              <div className="flex items-center gap-2 font-bold text-black">
                <Info className="w-4 h-4 text-sea" />
                <span>Petunjuk Pemindaian</span>
              </div>
              <p className="leading-relaxed">
                QR code dibuat dengan ketahanan tinggi agar tetap terbaca jelas meskipun logo diletakkan di tengah. Kompatibel dengan semua kamera smartphone Android dan iPhone.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
