"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  ShieldCheck,
  Eye,
  Link as LinkIcon,
} from "lucide-react";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import { renderQRCodeToCanvas } from "@/lib/qr-generator";
import { Translations } from "@/lib/translations";

interface PreviewCanvasProps {
  qrConfig: QRConfig;
  logoConfig: LogoConfig;
  mode: ModeType;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  t?: Translations["previewCanvas"];
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  qrConfig,
  logoConfig,
  mode,
  onCanvasReady,
  t,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isRendering, setIsRendering] = useState(false);

  const labels = t || {
    liveCanvas: "Kanvas Langsung",
    sublabel: "Mesin Resolusi Tinggi 1024 × 1024",
    copy: "Salin",
    copied: "Tersalin",
    zoomIn: "Perbesar",
    zoomOut: "Perkecil",
    payloadLabel: "Isi Tautan QR",
    qualityBadge: "Kualitas Tinggi",
    guarantee: "Mudah Dipindai Semua Perangkat",
    modeCustomLogo: "Mode: Logo Kustom",
    modeStandard: "Mode: QR Standar",
  };

  // Live rendering on any change
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRendering(true);

    const render = async () => {
      try {
        await renderQRCodeToCanvas({
          canvas,
          qrConfig,
          logoConfig,
          mode,
          targetSize: 1024,
        });

        if (!isCancelled && onCanvasReady) {
          onCanvasReady(canvas);
        }
      } catch (err) {
        console.error("Canvas render error:", err);
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [qrConfig, logoConfig, mode, onCanvasReady]);

  // Copy Canvas image to clipboard
  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (e) {
      console.warn("Clipboard API not supported for image blob:", e);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Bar with Live Badge & Quick Controls */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black dark:bg-white text-white dark:text-black font-semibold">
            <Eye className="w-3.5 h-3.5 text-sea dark:text-sea-600" />
            <span>{labels.liveCanvas}</span>
          </div>
          <span className="text-[11px] text-black/50 dark:text-white/50 hidden sm:inline">
            {labels.sublabel}
          </span>
        </div>

        {/* Zoom Controls & Copy */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-lg border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-900 p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
              className="p-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors cursor-pointer"
              title={labels.zoomOut}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono font-medium text-black/70 dark:text-white/70">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors cursor-pointer"
              title={labels.zoomIn}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              copied
                ? "bg-sea text-white border-sea"
                : "bg-white dark:bg-zinc-900 text-black/80 dark:text-white/80 border-black/15 dark:border-white/20 hover:border-sea hover:text-sea"
            }`}
            title="Copy image to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{labels.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{labels.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Canvas Viewport Card */}
      <div className="w-full py-8 px-4 flex items-center justify-center relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.02]">
        <div
          className="relative transition-transform duration-200 ease-out p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/15 dark:border-white/20 shadow-card"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas
            ref={canvasRef}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] block rounded-lg select-none"
            style={{ imageRendering: "pixelated" }}
          />

          {isRendering && (
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
              <span className="w-5 h-5 border-2 border-sea border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Active Content Box directly below QR */}
      <div className="w-full my-3 p-3 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-zinc-900/60 flex items-center gap-2.5 text-xs">
        <div className="w-7 h-7 rounded-lg bg-sea-50 dark:bg-sea-950/60 border border-sea-200 dark:border-sea-800 text-sea flex items-center justify-center shrink-0">
          <LinkIcon className="w-3.5 h-3.5 text-sea" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block tracking-wider">
            {labels.payloadLabel}
          </span>
          <p className="font-mono text-xs text-black dark:text-white truncate select-all">
            {qrConfig.content.trim() || "https://myqrmake.vercel.app"}
          </p>
        </div>
      </div>

      {/* Status Footer under Canvas */}
      <div className="w-full py-3 border-y border-black/10 dark:border-white/10 flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-center">
        <div className="flex items-center gap-1.5 text-black/70 dark:text-white/70">
          <ShieldCheck className="w-4 h-4 text-sea shrink-0" />
          <span className="font-semibold text-black dark:text-white">{labels.qualityBadge}</span>
          <span className="text-black/40 dark:text-white/40 font-bold">·</span>
          <span>{labels.guarantee}</span>
        </div>

        <span className="text-black/30 dark:text-white/30 hidden sm:inline font-bold">·</span>

        <div className="text-[11px] font-mono text-black/50 dark:text-white/50">
          {mode === "qr-with-logo" ? (
            <span className="text-sea font-semibold">{labels.modeCustomLogo}</span>
          ) : (
            <span>{labels.modeStandard}</span>
          )}
        </div>
      </div>
    </div>
  );
};
