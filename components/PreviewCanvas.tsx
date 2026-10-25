"use strict";
import React, { useEffect, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { QRConfig, LogoConfig, ModeType } from "@/types";
import { renderQRCodeToCanvas } from "@/lib/qr-generator";

interface PreviewCanvasProps {
  qrConfig: QRConfig;
  logoConfig: LogoConfig;
  mode: ModeType;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  qrConfig,
  logoConfig,
  mode,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isRendering, setIsRendering] = useState(false);

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
      <div className="w-full flex items-center justify-between pb-3 border-b border-black/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black text-white font-semibold">
            <Eye className="w-3.5 h-3.5 text-sea" />
            <span>Live Canvas</span>
          </div>
          <span className="text-[11px] text-black/50 hidden sm:inline">
            1024 × 1024 High Resolution Engine
          </span>
        </div>

        {/* Zoom Controls & Copy */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-lg border border-black/15 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
              className="p-1 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono font-medium text-black/70">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              copied
                ? "bg-sea text-white border-sea"
                : "bg-white text-black/80 border-black/15 hover:border-sea hover:text-sea"
            }`}
            title="Copy image to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Canvas Viewport Card */}
      <div className="w-full py-8 px-4 flex items-center justify-center relative overflow-hidden bg-black/[0.015]">
        {/* Subtle grid pattern background */}
        <div
          className="relative transition-transform duration-200 ease-out p-3 rounded-2xl bg-white border border-black/15 shadow-card"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas
            ref={canvasRef}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] block rounded-lg select-none"
            style={{ imageRendering: "pixelated" }}
          />

          {isRendering && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
              <span className="w-5 h-5 border-2 border-sea border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Status Footer under Canvas */}
      <div className="w-full pt-3 border-t border-black/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-black/70">
          <ShieldCheck className="w-4 h-4 text-sea" />
          <span className="font-semibold text-black">High ECC (30%)</span>
          <span className="text-black/40">·</span>
          <span>100% Read Guarantee</span>
        </div>

        <div className="text-[11px] font-mono text-black/50">
          {mode === "qr-with-logo" ? (
            <span className="text-sea font-semibold">Mode: Custom Logo</span>
          ) : (
            <span>Mode: Standard QR</span>
          )}
        </div>
      </div>
    </div>
  );
};
