"use client";
import React, { useState } from "react";
import {
  Download,
  FileText,
  CheckCircle2,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import { renderQRCodeToCanvas } from "@/lib/qr-generator";
import { exportQRCodeToPDF } from "@/lib/pdf-export";
import { Language, Translations } from "@/lib/translations";

interface ExportBarProps {
  canvasElement: HTMLCanvasElement | null;
  qrConfig: QRConfig;
  logoConfig: LogoConfig;
  mode: ModeType;
  lang?: Language;
  t?: Translations["exportBar"];
}

export const ExportBar: React.FC<ExportBarProps> = ({
  canvasElement,
  qrConfig,
  logoConfig,
  mode,
  lang = "id",
  t,
}) => {
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportResolution, setExportResolution] = useState<number>(2048);
  const [showResMenu, setShowResMenu] = useState(false);
  const [congratsModal, setCongratsModal] = useState<{
    open: boolean;
    type: "image" | "pdf";
    filename: string;
  } | null>(null);

  // Fallback translation if not provided
  const labels = t || {
    downloadImage: "Unduh Gambar Resolusi Tinggi",
    downloadPdf: "Unduh Dokumen PDF Siap Cetak",
    resolutions: {
      r1k: "Standar Jernih (1K)",
      r2k: "Ultra HD (2K) · Disarankan",
      r4k: "Master Cetak (4K)",
    },
    modal: {
      title: "Selamat! Unduhan Berhasil",
      descImage:
        "Gambar QR code resolusi tinggi Anda telah berhasil dibuat dan disimpan ke perangkat Anda. Siap digunakan kapan saja.",
      descPdf:
        "Dokumen PDF siap cetak ukuran A4 telah berhasil diunduh. Dilengkapi tampilan tajam dan kotak informasi tautan.",
      closeBtn: "Selesai",
    },
  };

  const handleDownloadImage = async () => {
    setIsExportingImage(true);
    try {
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
      const cleanName =
        "MyQR_Make_" +
        (mode === "qr-with-logo" ? "CustomLogo" : "QR") +
        "_" +
        exportResolution +
        "px.png";
      link.download = cleanName;
      link.href = dataUrl;
      link.click();

      // Show classy congrats modal (replaces birthday confetti)
      setCongratsModal({
        open: true,
        type: "image",
        filename: cleanName,
      });
    } catch (err) {
      console.error("Export image error:", err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      const offscreenCanvas = document.createElement("canvas");
      await renderQRCodeToCanvas({
        canvas: offscreenCanvas,
        qrConfig,
        logoConfig,
        mode,
        targetSize: 2048,
      });

      const pdfFilename = "MyQR_Make_Document_2026.pdf";
      exportQRCodeToPDF({
        canvas: offscreenCanvas,
        qrConfig,
        logoConfig,
        mode,
        filename: pdfFilename,
        lang,
      });

      // Show classy congrats modal (replaces birthday confetti)
      setCongratsModal({
        open: true,
        type: "pdf",
        filename: pdfFilename,
      });
    } catch (err) {
      console.error("Export PDF error:", err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Option 1: High Resolution Image Download */}
        <div className="relative flex">
          <button
            type="button"
            disabled={isExportingImage}
            onClick={handleDownloadImage}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-l-xl bg-sea text-white font-semibold text-xs sm:text-sm hover:bg-sea-700 active:bg-sea-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isExportingImage ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-white" />
            )}
            <span>{labels.downloadImage}</span>
          </button>

          {/* Resolution Selector Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowResMenu((prev) => !prev)}
              className="h-full px-2.5 rounded-r-xl bg-sea-700 hover:bg-sea-800 text-white border-l border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              title="Pilih Resolusi Gambar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {showResMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-56 rounded-xl border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 shadow-xl py-1.5 z-30 animate-fadeIn text-xs">
                <div className="px-3 py-1 font-semibold text-black/50 dark:text-white/50 text-[10px] uppercase tracking-wider">
                  Resolusi Export
                </div>
                {[
                  { size: 1024, label: labels.resolutions.r1k },
                  { size: 2048, label: labels.resolutions.r2k },
                  { size: 4096, label: labels.resolutions.r4k },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => {
                      setExportResolution(item.size);
                      setShowResMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer ${
                      exportResolution === item.size
                        ? "text-sea font-bold bg-sea-50/50 dark:bg-sea-950/30"
                        : "text-black dark:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono opacity-60">
                      {item.size}px
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Option 2: Print Ready PDF Download */}
        <button
          type="button"
          disabled={isExportingPDF}
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-black/20 dark:border-white/20 bg-white dark:bg-zinc-900 hover:border-black/40 dark:hover:border-white/40 text-black dark:text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          {isExportingPDF ? (
            <span className="w-4 h-4 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FileText className="w-4 h-4 text-sea" />
          )}
          <span>{labels.downloadPdf}</span>
        </button>
      </div>

      {/* Classy Congrats / Success Modal (Replaces confetti) */}
      {congratsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-black/15 dark:border-white/15 shadow-2xl p-6 text-center space-y-4">
            {/* Success Icon */}
            <div className="mx-auto w-12 h-12 rounded-full bg-sea-50 dark:bg-sea-950/60 border border-sea-200 dark:border-sea-800 text-sea flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-sea" />
            </div>

            {/* Modal Heading & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-black dark:text-white">
                {labels.modal.title}
              </h3>
              <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed text-justify">
                {congratsModal.type === "image"
                  ? labels.modal.descImage
                  : labels.modal.descPdf}
              </p>
            </div>

            {/* File details tag */}
            <div className="px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[11px] font-mono text-black/70 dark:text-white/70 truncate">
              {congratsModal.filename}
            </div>

            {/* Done Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCongratsModal(null)}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-sea dark:hover:bg-sea dark:hover:text-white transition-all shadow-sm cursor-pointer"
              >
                {labels.modal.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
