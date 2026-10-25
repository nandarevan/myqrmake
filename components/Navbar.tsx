"use client";
import React from "react";
import { RefreshCw, Globe, Moon, Sun } from "lucide-react";
import { Language, Translations } from "@/lib/translations";

interface NavbarProps {
  onReset: () => void;
  lang: Language;
  onToggleLang: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  t: Translations["navbar"];
}

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  t,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_myqrmake.png"
              alt="MyQR Make"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform hover:scale-105 dark:brightness-110"
            />
          </div>
          <div className="hidden lg:block pl-4 border-l border-black/15 dark:border-white/15">
            <p className="text-xs text-black/60 dark:text-white/60 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls: Language Toggle, Theme Toggle & Reset */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Pill */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-xl border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 text-black dark:text-white hover:border-sea hover:text-sea dark:hover:border-sea transition-all active:scale-95 cursor-pointer shadow-subtle"
            title={lang === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
          >
            <Globe className="w-3.5 h-3.5 text-sea shrink-0" />
            <span className="font-bold">{lang === "id" ? "ID" : "EN"}</span>
            <span className="text-black/50 dark:text-white/50 text-[11px] hidden sm:inline">
              {lang === "id" ? "Bahasa" : "English"}
            </span>
          </button>

          {/* Dark / Light Theme Toggle Pill */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-xl border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 text-black dark:text-white hover:border-sea hover:text-sea dark:hover:border-sea transition-all active:scale-95 cursor-pointer shadow-subtle"
            title={theme === "light" ? "Ganti ke Tema Gelap" : "Ganti ke Tema Terang"}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-black/80" />
            ) : (
              <Sun className="w-4 h-4 text-sea" />
            )}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-xl border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 text-black dark:text-white hover:border-sea hover:text-sea transition-all active:scale-95 cursor-pointer shadow-subtle"
            title={t.resetTooltip}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.reset}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
