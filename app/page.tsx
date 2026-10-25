"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ModeToggle } from "@/components/ModeToggle";
import { InputPanel } from "@/components/InputPanel";
import { LogoPanel } from "@/components/LogoPanel";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { ExportBar } from "@/components/ExportBar";
import { Footer } from "@/components/Footer";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import { translations, Language } from "@/lib/translations";
import {
  Sparkles,
  Info,
} from "lucide-react";

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
  const [lang, setLang] = useState<Language>("id");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mode, setMode] = useState<ModeType>("only-qr");
  const [qrConfig, setQRConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(DEFAULT_LOGO_CONFIG);
  const [activeCanvas, setActiveCanvas] = useState<HTMLCanvasElement | null>(null);

  // Initialize Language (Auto-detect Indonesia vs outside) & Theme (Light default)
  useEffect(() => {
    // Language: check localStorage or auto-detect based on user's browser locale
    try {
      const savedLang = localStorage.getItem("myqrmake_lang") as Language | null;
      if (savedLang === "id" || savedLang === "en") {
        setLang(savedLang);
      } else {
        const browserLocale = (typeof navigator !== "undefined" && navigator.language?.toLowerCase()) || "";
        // If user is from Indonesia (id, id-ID, in), use Indonesian; otherwise use English
        const detected = browserLocale.startsWith("id") || browserLocale.startsWith("in") ? "id" : "en";
        setLang(detected);
      }
    } catch (e) {
      // Storage access fallback
    }

    // Theme: Light is default
    try {
      const savedTheme = localStorage.getItem("myqrmake_theme") as "light" | "dark" | null;
      if (savedTheme === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      // Storage access fallback
    }
  }, []);

  const handleToggleLang = () => {
    const nextLang: Language = lang === "id" ? "en" : "id";
    setLang(nextLang);
    try {
      localStorage.setItem("myqrmake_lang", nextLang);
    } catch (e) {}
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("myqrmake_theme", nextTheme);
    } catch (e) {}
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Active translation dictionary
  const t = translations[lang];

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

  // Mode change handler without forcing logo
  const handleModeChange = useCallback((newMode: ModeType) => {
    setMode(newMode);
  }, []);

  // Load sample logo helper (only when explicitly requested)
  const handleLoadSampleLogo = () => {
    setMode("qr-with-logo");
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-200 selection:bg-sea selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onReset={handleReset}
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        t={t.navbar}
      />

      {/* Hero Intro */}
      <section className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 py-8 sm:py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-sm sm:text-base text-black/60 dark:text-white/60 max-w-2xl mt-1.5 text-justify">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Quick action: Sample logo */}
            <div className="flex items-center gap-2">
              {mode === "only-qr" ? (
                <button
                  type="button"
                  onClick={handleLoadSampleLogo}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-zinc-900 hover:border-sea hover:text-sea text-xs font-semibold text-black dark:text-white transition-all shadow-subtle active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sea" />
                  <span>{t.hero.sampleLogoBtn}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-sea" />
                  <span>{t.hero.customLogoActive}</span>
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
                <span className="text-xs font-bold tracking-wider text-black dark:text-white uppercase">
                  {t.modeToggle.heading}
                </span>
                <span className="text-[11px] font-mono text-black/50 dark:text-white/50">
                  {mode === "only-qr" ? t.modeToggle.standardSublabel : t.modeToggle.logoSublabel}
                </span>
              </div>
              <ModeToggle
                currentMode={mode}
                onModeChange={handleModeChange}
                t={t.modeToggle}
              />
            </div>

            {/* 2. Control Panels in Card */}
            <div className="p-6 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-card space-y-6 transition-colors">
              {/* Input & QR Grid Customization with Logo Panel right below Section 1 */}
              <InputPanel
                config={qrConfig}
                onChange={handleQRChange}
                hasLogo={mode === "qr-with-logo"}
                t={t.inputPanel}
              >
                {mode === "qr-with-logo" && (
                  <LogoPanel
                    config={logoConfig}
                    onChange={handleLogoChange}
                    onClear={handleClearLogo}
                    t={t.logoPanel}
                  />
                )}
              </InputPanel>
            </div>
          </div>

          {/* Right Column: Sticky Live Preview & Dual Export Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Live Canvas Card */}
            <div className="p-6 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-card transition-colors">
              <PreviewCanvas
                qrConfig={qrConfig}
                logoConfig={logoConfig}
                mode={mode}
                onCanvasReady={setActiveCanvas}
                t={t.previewCanvas}
              />

              {/* Dual Export Options */}
              <div className="pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider text-black dark:text-white uppercase">
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
                  lang={lang}
                  t={t.exportBar}
                />
              </div>
            </div>

            {/* Friendly Scannability Information */}
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 space-y-2 text-xs text-black/70 dark:text-white/70 transition-colors">
              <div className="flex items-center gap-2 font-bold text-black dark:text-white">
                <Info className="w-4 h-4 text-sea" />
                <span>{t.infoCard.title}</span>
              </div>
              <p className="leading-relaxed text-justify">
                {t.infoCard.desc}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer t={t.footer} />
    </div>
  );
}
