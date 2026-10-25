"use client";
import React from "react";
import { QrCode, Image as ImageIcon } from "lucide-react";
import { ModeType } from "@/types";
import { Translations } from "@/lib/translations";

interface ModeToggleProps {
  currentMode: ModeType;
  onModeChange: (mode: ModeType) => void;
  t?: Translations["modeToggle"];
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  currentMode,
  onModeChange,
  t,
}) => {
  const labels = t || {
    heading: "PILIH GAYA KODE QR",
    standardSublabel: "QR Standar Bersih",
    logoSublabel: "QR Logo Kustom",
    standardTitle: "Kode QR Standar",
    standardDesc: "Kode bersih dan sederhana",
    logoTitle: "QR dengan Logo Anda",
    logoDesc: "Unggah dan atur posisi logo",
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-1 rounded-xl border border-black/10 dark:border-white/10 shadow-sm transition-colors">
      <div className="grid grid-cols-2 gap-1.5" role="tablist">
        {/* Mode 1: Standard QR Code */}
        <button
          role="tab"
          type="button"
          aria-selected={currentMode === "only-qr"}
          onClick={() => onModeChange("only-qr")}
          className={`relative flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer ${
            currentMode === "only-qr"
              ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
              : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <QrCode
            className={`w-4 h-4 shrink-0 transition-colors ${
              currentMode === "only-qr"
                ? "text-sea dark:text-sea-600"
                : "text-black/50 dark:text-white/50"
            }`}
          />
          <div className="flex flex-col items-start text-left">
            <span className="leading-tight">{labels.standardTitle}</span>
            <span
              className={`text-[10px] font-normal mt-0.5 ${
                currentMode === "only-qr"
                  ? "text-white/70 dark:text-black/70"
                  : "text-black/45 dark:text-white/45"
              }`}
            >
              {labels.standardDesc}
            </span>
          </div>

          {/* Absolute indicator dot so it never shifts the centered text */}
          {currentMode === "only-qr" && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sea" />
          )}
        </button>

        {/* Mode 2: QR with Your Logo */}
        <button
          role="tab"
          type="button"
          aria-selected={currentMode === "qr-with-logo"}
          onClick={() => onModeChange("qr-with-logo")}
          className={`relative flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer ${
            currentMode === "qr-with-logo"
              ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
              : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <ImageIcon
            className={`w-4 h-4 shrink-0 transition-colors ${
              currentMode === "qr-with-logo"
                ? "text-sea dark:text-sea-600"
                : "text-black/50 dark:text-white/50"
            }`}
          />
          <div className="flex flex-col items-start text-left">
            <span className="leading-tight">{labels.logoTitle}</span>
            <span
              className={`text-[10px] font-normal mt-0.5 ${
                currentMode === "qr-with-logo"
                  ? "text-white/70 dark:text-black/70"
                  : "text-black/45 dark:text-white/45"
              }`}
            >
              {labels.logoDesc}
            </span>
          </div>

          {/* Absolute indicator dot so it never shifts the centered text */}
          {currentMode === "qr-with-logo" && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sea" />
          )}
        </button>
      </div>
    </div>
  );
};
