# LogoQR Studio

> Production-ready, ultra-minimalist, high-precision QR Code generator with custom logo positioning and dual export engine (High-Res Image & Professional PDF). Built with **Next.js 14 App Router**, **Tailwind CSS**, and **Lucide React**.

---

## 🎨 Design System & Strict 3-Color Palette

LogoQR Studio strictly adheres to an ultra-clean, modern, flat design system using only 3 colors across the entire user interface:
1. **Pure White (`#ffffff`)**: Clean backgrounds, card containers, and quiet zones.
2. **Deep Black (`#000000`)**: Primary typography, structural borders, dark accents, and default QR modules.
3. **Sea Blue (`#0284c7`)**: Sole brand accent color for primary buttons, active tabs, hover transitions, and focus rings.

---

## 🚀 Key Features

### 1. Dual Menu Navigation Modes
- **Mode 1: Only QR Code**: Instant standard QR generation without any logo for clean, minimal codes.
- **Mode 2: QR Code with Custom Logo**: Enables drag-and-drop / file upload for PNG, JPEG, and SVG logos with flexible positioning.

### 2. Flexible Logo Positioning & Background Cutout
- Position choices: **Center**, **Top Left**, **Top Right**, **Bottom Left**, **Bottom Right**.
- Background pad shapes: **Circle**, **Rounded Square**, **Square**, or **Direct Cutout**.
- Automated module avoidance ensures no modules clash behind the logo pad.

### 3. Smart Scannability Warnings & Advisory
- Non-intrusive warning banners automatically alert users if:
  - Uploaded logo file size exceeds 2 MB
  - Image dimensions exceed 1500 px
  - Logo coverage exceeds 25% of the QR matrix
- Includes an interactive **Auto-fit to 20% Safe Zone** one-click optimization button.

### 4. Live HTML5 Canvas Engine
- Real-time instant redraw with zero input lag.
- Built-in Reed–Solomon **Level H (30% error correction)** for guaranteed scanning reliability.
- Live canvas zoom (75% to 130%) and one-click **Copy to Clipboard**.

### 5. Dual Export Studio
- **High-Resolution Image**: Download PNG at selectable resolutions (1024px Web, 2048px Print 2K, 4096px Ultra 4K).
- **Professional PDF Export**: Generates an A4 print-ready PDF with clean typography, centered QR code, encoded URL/text metadata, and branding.

### 6. Clean Footer
- Displays: `Nanda Revan Saputro 2026` strictly without any hyphens or dashes.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Engine**: [qrcode](https://www.npmjs.com/package/qrcode)
- **PDF Engine**: [jspdf](https://www.npmjs.com/package/jspdf)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Language**: TypeScript

---

## 📦 Project Structure

```text
myqrmake/
├── app/
│   ├── globals.css          # Design system variables & Tailwind directives
│   ├── layout.tsx           # SEO metadata, fonts, viewport config
│   └── page.tsx             # Studio state, live preview, dual workflow
├── components/
│   ├── Navbar.tsx           # Brand header, ECC indicator, reset action
│   ├── ModeToggle.tsx       # Dual menu switcher (Only QR / QR with Logo)
│   ├── InputPanel.tsx       # Payload input, presets, module & eye styling
│   ├── LogoPanel.tsx        # Logo uploader, 5-position grid, smart warnings
│   ├── PreviewCanvas.tsx    # Real-time HTML5 canvas preview & copy tool
│   ├── ExportBar.tsx        # High-res image download & PDF document export
│   └── Footer.tsx           # Minimalist footer (Nanda Revan Saputro 2026)
├── lib/
│   ├── qr-generator.ts      # Canvas matrix generator & logo compositor
│   └── pdf-export.ts        # Print-ready vector PDF document generator
├── types/
│   └── index.ts             # Shared TypeScript types & interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.mjs
```

---

## 💻 Local Development

1. Ensure Node.js 18+ is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Zero-Config Deployment on Vercel

This repository is fully configured for seamless zero-config deployment on Vercel:

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Click **Deploy**. Your app is live!

---

## 📜 Credits & License

LogoQR Studio · 2026 Nanda Revan Saputro
