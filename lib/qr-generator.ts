import QRCode from "qrcode";
import { QRConfig, LogoConfig, ModuleStyle, EyeStyle, LogoShape } from "@/types";

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  qrConfig: QRConfig;
  logoConfig?: LogoConfig | null;
  mode: "only-qr" | "qr-with-logo";
  targetSize?: number; // e.g. 1024 or 2048 for high-res export
}

/**
 * Checks if a given module coordinate (row, col) is part of the 3 main corner finder patterns.
 * Finder patterns occupy 7x7 modules at top-left, top-right, and bottom-left, plus 1 module separator.
 */
function isFinderPattern(row: number, col: number, moduleCount: number): boolean {
  // Top-Left Finder
  if (row < 8 && col < 8) return true;
  // Top-Right Finder
  if (row < 8 && col >= moduleCount - 8) return true;
  // Bottom-Left Finder
  if (row >= moduleCount - 8 && col < 8) return true;
  return false;
}

/**
 * Draws a rounded rectangle path on canvas.
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.lineTo(x + width, y + height - r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.lineTo(x + r, y + height);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Draws a corner eye (outer 7x7 ring and inner 3x3 box/dot).
 */
function drawCornerEye(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  eyeStyle: EyeStyle,
  color: string,
  bgColor: string
) {
  const cellSize = size / 7;

  // Outer ring (7x7)
  ctx.fillStyle = color;
  if (eyeStyle === "rounded") {
    drawRoundedRect(ctx, x, y, size, size, cellSize * 2);
    ctx.fill();
  } else if (eyeStyle === "circle") {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, size, size);
  }

  // White cutout (5x5)
  ctx.fillStyle = bgColor;
  const innerCutoutX = x + cellSize;
  const innerCutoutY = y + cellSize;
  const innerCutoutSize = cellSize * 5;

  if (eyeStyle === "rounded") {
    drawRoundedRect(ctx, innerCutoutX, innerCutoutY, innerCutoutSize, innerCutoutSize, cellSize * 1.5);
    ctx.fill();
  } else if (eyeStyle === "circle") {
    ctx.beginPath();
    ctx.arc(
      innerCutoutX + innerCutoutSize / 2,
      innerCutoutY + innerCutoutSize / 2,
      innerCutoutSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  } else {
    ctx.fillRect(innerCutoutX, innerCutoutY, innerCutoutSize, innerCutoutSize);
  }

  // Inner core (3x3)
  ctx.fillStyle = color;
  const coreX = x + cellSize * 2;
  const coreY = y + cellSize * 2;
  const coreSize = cellSize * 3;

  if (eyeStyle === "rounded") {
    drawRoundedRect(ctx, coreX, coreY, coreSize, coreSize, cellSize * 1);
    ctx.fill();
  } else if (eyeStyle === "circle") {
    ctx.beginPath();
    ctx.arc(coreX + coreSize / 2, coreY + coreSize / 2, coreSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(coreX, coreY, coreSize, coreSize);
  }
}

/**
 * Calculates logo bounding box in canvas coordinates based on position and scale.
 */
function getLogoBounds(
  position: LogoConfig["position"],
  scale: number,
  qrActualSize: number,
  marginOffset: number
): { x: number; y: number; width: number; height: number } {
  const logoSize = Math.round(qrActualSize * Math.max(0.12, Math.min(scale, 0.32)));
  let x = marginOffset + (qrActualSize - logoSize) / 2;
  let y = marginOffset + (qrActualSize - logoSize) / 2;

  const pad = Math.round(qrActualSize * 0.04);

  switch (position) {
    case "center":
      x = marginOffset + (qrActualSize - logoSize) / 2;
      y = marginOffset + (qrActualSize - logoSize) / 2;
      break;
    case "top-left":
      x = marginOffset + pad;
      y = marginOffset + pad;
      break;
    case "top-right":
      x = marginOffset + qrActualSize - logoSize - pad;
      y = marginOffset + pad;
      break;
    case "bottom-left":
      x = marginOffset + pad;
      y = marginOffset + qrActualSize - logoSize - pad;
      break;
    case "bottom-right":
      x = marginOffset + qrActualSize - logoSize - pad;
      y = marginOffset + qrActualSize - logoSize - pad;
      break;
  }

  return { x, y, width: logoSize, height: logoSize };
}

/**
 * Main QR code canvas rendering function.
 */
export async function renderQRCodeToCanvas({
  canvas,
  qrConfig,
  logoConfig,
  mode,
  targetSize = 1024,
}: RenderOptions): Promise<void> {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const content = qrConfig.content.trim() || "https://myqrmake.vercel.app";

  // Create QR instance with High error correction level
  const qr = QRCode.create(content, {
    errorCorrectionLevel: "H",
  });

  const moduleCount = qr.modules.size;
  const canvasSize = targetSize;
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Margin calculation
  const marginModules = qrConfig.margin;
  const totalModules = moduleCount + marginModules * 2;
  const moduleSize = canvasSize / totalModules;
  const marginOffset = marginModules * moduleSize;
  const qrActualSize = moduleCount * moduleSize;

  // 1. Fill entire background with Pure White
  ctx.fillStyle = qrConfig.lightColor;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Determine logo bounds if in Mode 2
  const hasLogo =
    mode === "qr-with-logo" &&
    Boolean(logoConfig?.dataUrl) &&
    Boolean(logoConfig);

  let logoBounds = { x: 0, y: 0, width: 0, height: 0 };
  let logoClearedBounds = { x: 0, y: 0, width: 0, height: 0 };

  if (hasLogo && logoConfig) {
    logoBounds = getLogoBounds(
      logoConfig.position,
      logoConfig.scale,
      qrActualSize,
      marginOffset
    );

    // Padding around the cutout to make sure no modules touch the logo
    const clearPad = moduleSize * 0.5;
    logoClearedBounds = {
      x: logoBounds.x - clearPad,
      y: logoBounds.y - clearPad,
      width: logoBounds.width + clearPad * 2,
      height: logoBounds.height + clearPad * 2,
    };
  }

  // 2. Render modules (skipping finder patterns and logo cutout area)
  ctx.fillStyle = qrConfig.darkColor;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      // Skip finder patterns (drawn separately for custom eye styles)
      if (isFinderPattern(row, col, moduleCount)) {
        continue;
      }

      const isDark = qr.modules.get(row, col);
      if (!isDark) continue;

      const modX = marginOffset + col * moduleSize;
      const modY = marginOffset + row * moduleSize;

      // If this module falls inside the logo pad, don't draw it
      if (
        hasLogo &&
        modX + moduleSize >= logoClearedBounds.x &&
        modX <= logoClearedBounds.x + logoClearedBounds.width &&
        modY + moduleSize >= logoClearedBounds.y &&
        modY <= logoClearedBounds.y + logoClearedBounds.height
      ) {
        continue;
      }

      // Draw module based on style
      if (qrConfig.moduleStyle === "rounded") {
        drawRoundedRect(
          ctx,
          modX + moduleSize * 0.05,
          modY + moduleSize * 0.05,
          moduleSize * 0.9,
          moduleSize * 0.9,
          moduleSize * 0.3
        );
        ctx.fill();
      } else if (qrConfig.moduleStyle === "dots") {
        ctx.beginPath();
        ctx.arc(
          modX + moduleSize / 2,
          modY + moduleSize / 2,
          moduleSize * 0.42,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // Square
        ctx.fillRect(modX, modY, moduleSize + 0.5, moduleSize + 0.5); // +0.5 to prevent micro gaps
      }
    }
  }

  // 3. Draw 3 Corner Eyes
  const eyeSize = 7 * moduleSize;
  const eyePositions = [
    { x: marginOffset, y: marginOffset }, // Top-Left
    { x: marginOffset + (moduleCount - 7) * moduleSize, y: marginOffset }, // Top-Right
    { x: marginOffset, y: marginOffset + (moduleCount - 7) * moduleSize }, // Bottom-Left
  ];

  for (const pos of eyePositions) {
    drawCornerEye(
      ctx,
      pos.x,
      pos.y,
      eyeSize,
      qrConfig.eyeStyle,
      qrConfig.darkColor,
      qrConfig.lightColor
    );
  }

  // 4. Render Logo if in Mode 2
  if (hasLogo && logoConfig && logoConfig.dataUrl) {
    await renderLogoOnCanvas(ctx, logoConfig, logoBounds, qrConfig.lightColor);
  }
}

/**
 * Loads an image from dataURL and renders it onto canvas at target bounds with background shape.
 */
function renderLogoOnCanvas(
  ctx: CanvasRenderingContext2D,
  logoConfig: LogoConfig,
  bounds: { x: number; y: number; width: number; height: number },
  bgColor: string
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      ctx.save();

      const { x, y, width, height } = bounds;

      // Draw background shape if selected
      if (logoConfig.shape !== "none") {
        ctx.fillStyle = bgColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        if (logoConfig.shape === "circle") {
          ctx.beginPath();
          ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (logoConfig.shape === "rounded") {
          drawRoundedRect(ctx, x, y, width, height, width * 0.22);
          ctx.fill();
        } else {
          // Square
          ctx.fillRect(x, y, width, height);
        }

        // Reset shadow for logo image
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      // Clip logo if shape is circle or rounded
      ctx.save();
      const padding = bounds.width * (logoConfig.padding / 100);
      const innerX = x + padding;
      const innerY = y + padding;
      const innerW = width - padding * 2;
      const innerH = height - padding * 2;

      if (logoConfig.shape === "circle") {
        ctx.beginPath();
        ctx.arc(
          innerX + innerW / 2,
          innerY + innerH / 2,
          innerW / 2,
          0,
          Math.PI * 2
        );
        ctx.clip();
      } else if (logoConfig.shape === "rounded") {
        drawRoundedRect(ctx, innerX, innerY, innerW, innerH, innerW * 0.2);
        ctx.clip();
      }

      // Maintain aspect ratio of logo image
      const imgAspect = img.width / img.height;
      let drawW = innerW;
      let drawH = innerH;
      let drawX = innerX;
      let drawY = innerY;

      if (imgAspect > 1) {
        drawH = innerW / imgAspect;
        drawY = innerY + (innerH - drawH) / 2;
      } else {
        drawW = innerH * imgAspect;
        drawX = innerX + (innerW - drawW) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      ctx.restore();
      resolve();
    };

    img.onerror = () => {
      resolve();
    };

    img.src = logoConfig.dataUrl!;
  });
}
