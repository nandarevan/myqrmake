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
  filename = "MyQR_Make_Document_2026.pdf",
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

  // Header Title: MyQR Make
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0); // Deep Black
  doc.text("MyQR Make", 20, 26);

  // Subtitle / Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Professional High Resolution QR Code Document", 20, 33);

  // Subtle separator line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(20, 38, pageWidth - 20, 38);

  // QR Code Image in Center
  const qrImageSize = 120; // 120mm x 120mm (crisp and balanced)
  const qrX = (pageWidth - qrImageSize) / 2;
  const qrY = 56;

  // Outer subtle frame around QR
  doc.setDrawColor(230, 230, 230);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 5, qrY - 5, qrImageSize + 10, qrImageSize + 10, 4, 4, "FD");

  // Convert canvas to PNG data URL
  const qrDataUrl = canvas.toDataURL("image/png", 1.0);
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrImageSize, qrImageSize);

  // Box displaying entered link/payload directly below QR
  const displayContent = qrConfig.content.trim() || "https://myqrmake.vercel.app";
  const cardWidth = 150;
  const cardX = (pageWidth - cardWidth) / 2;
  const cardY = qrY + qrImageSize + 14;

  doc.setFont("courier", "normal");
  doc.setFontSize(8.5);
  const textLines = doc.splitTextToSize(displayContent, cardWidth - 20);
  const maxLines = Math.min(textLines.length, 3);
  const cardHeight = 22 + (maxLines - 1) * 5;

  // Box background & subtle border
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(220, 225, 230);
  doc.setLineWidth(0.4);
  doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, "FD");

  // Sea Blue left indicator bar
  doc.setFillColor(2, 132, 199);
  doc.roundedRect(cardX, cardY, 3, cardHeight, 1.5, 1.5, "F");

  // Label inside card
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(2, 132, 199); // Sea Blue
  doc.text("Isi Tautan QR:", cardX + 8, cardY + 7.5);

  // Content text lines
  doc.setFont("courier", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0); // Deep Black
  for (let i = 0; i < maxLines; i++) {
    const lineText = (i === maxLines - 1 && textLines.length > maxLines)
      ? textLines[i].slice(0, -3) + "..."
      : textLines[i];
    doc.text(lineText, cardX + 8, cardY + 15 + i * 5);
  }

  // Scan instruction under the box
  const tipY = cardY + cardHeight + 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Arahkan kamera smartphone ke kode QR untuk membuka tautan secara instan",
    pageWidth / 2,
    tipY,
    { align: "center" }
  );

  // Bottom Footer: STRICTLY NO HYPHENS OR DASHES
  const footerY = pageHeight - 16;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(20, footerY - 6, pageWidth - 20, footerY - 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);

  // Footer Left & Right: MyQR Make · Ultra Minimalist Engine & Nanda Revan Saputro 2026
  const footerLeft = "MyQR Make · Ultra Minimalist Engine";
  const footerRight = "Nanda Revan Saputro 2026";

  doc.text(footerLeft, 20, footerY);
  const textWidth = doc.getTextWidth(footerRight);
  doc.text(footerRight, pageWidth - 20 - textWidth, footerY);

  // Save the PDF
  doc.save(filename);
}
