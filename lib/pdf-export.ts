import jsPDF from "jspdf";
import { QRConfig, LogoConfig } from "@/types";

interface PDFExportOptions {
  canvas: HTMLCanvasElement;
  qrConfig: QRConfig;
  logoConfig?: LogoConfig | null;
  mode: "only-qr" | "qr-with-logo";
  filename?: string;
}

export function exportQRCodeToPDF({
  canvas,
  qrConfig,
  logoConfig,
  mode,
  filename = "LogoQR_Studio_Document.pdf",
}: PDFExportOptions) {
  // A4 portrait dimensions: 210 x 297 mm
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Background: Pure White
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Accent Bar: Sea Blue (#0284c7 -> RGB: 2, 132, 199)
  doc.setFillColor(2, 132, 199);
  doc.rect(0, 0, pageWidth, 4, "F");

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0); // Deep Black
  doc.text("LogoQR Studio", 20, 24);

  // Subtitle / Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Professional High Resolution QR Code Document", 20, 31);

  // Subtle separator line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(20, 36, pageWidth - 20, 36);

  // QR Code Image in Center
  const qrImageSize = 110; // 110mm x 110mm
  const qrX = (pageWidth - qrImageSize) / 2;
  const qrY = 48;

  // Outer subtle frame around QR
  doc.setDrawColor(240, 240, 240);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 5, qrY - 5, qrImageSize + 10, qrImageSize + 10, 4, 4, "FD");

  // Convert canvas to PNG data URL
  const qrDataUrl = canvas.toDataURL("image/png", 1.0);
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrImageSize, qrImageSize);

  // Content Details Card
  const cardY = qrY + qrImageSize + 16;
  const cardWidth = pageWidth - 40;
  const cardHeight = 44;

  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, cardY, cardWidth, cardHeight, 3, 3, "D");

  // Sea Blue small indicator dot
  doc.setFillColor(2, 132, 199);
  doc.circle(28, cardY + 11, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("Encoded Content", 34, cardY + 12);

  // Truncate content text safely if long
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const rawContent = qrConfig.content || "https://logoqrstudio.vercel.app";
  const displayContent =
    rawContent.length > 85 ? rawContent.substring(0, 82) + "..." : rawContent;
  doc.text(displayContent, 34, cardY + 19);

  // Metadata Grid inside Card
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("GENERATION MODE", 34, cardY + 29);
  doc.text("ERROR CORRECTION", 90, cardY + 29);
  doc.text("CREATED", 146, cardY + 29);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);

  const modeLabel =
    mode === "qr-with-logo" ? "QR with Custom Logo" : "Standard QR Code";
  doc.text(modeLabel, 34, cardY + 36);
  doc.text("High (30% redundancy)", 90, cardY + 36);

  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  doc.text(dateStr, 146, cardY + 36);

  // Instructions & Scan Tip
  const tipY = cardY + cardHeight + 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(2, 132, 199); // Sea Blue
  doc.text("Scan Tip:", 20, tipY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Point your smartphone camera or QR scanner directly at the code. High error correction guarantees instant read.",
    38,
    tipY
  );

  // Bottom Footer: STRICTLY NO HYPHENS OR DASHES
  const footerY = pageHeight - 16;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(20, footerY - 6, pageWidth - 20, footerY - 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);

  // Strictly no hyphens or dashes as explicitly instructed
  const footerLeft = "LogoQR Studio · Ultra Minimalist Engine";
  const footerRight = "Nanda Revan Saputro 2026";

  doc.text(footerLeft, 20, footerY);
  const textWidth = doc.getTextWidth(footerRight);
  doc.text(footerRight, pageWidth - 20 - textWidth, footerY);

  // Save the PDF
  doc.save(filename);
}
