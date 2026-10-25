export type ModeType = "only-qr" | "qr-with-logo";

export type LogoPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ModuleStyle = "square" | "rounded" | "dots";
export type EyeStyle = "square" | "rounded" | "circle";
export type LogoShape = "square" | "rounded" | "circle" | "none";

export interface QRConfig {
  content: string;
  errorCorrectionLevel: "H"; // Strictly High (30%) as requested
  moduleStyle: ModuleStyle;
  eyeStyle: EyeStyle;
  darkColor: "#000000" | "#0284c7"; // Deep Black or Sea Blue
  lightColor: "#ffffff"; // Pure White
  margin: number;
}

export interface LogoConfig {
  file: File | null;
  dataUrl: string | null;
  name: string;
  sizeBytes: number;
  width: number;
  height: number;
  position: LogoPosition;
  scale: number; // 0.10 to 0.30 (10% to 30%)
  shape: LogoShape;
  padding: number; // padding around logo inside cutout
}

export interface WarningState {
  hasWarning: boolean;
  type: "file-size" | "dimensions" | "coverage" | null;
  message: string;
  recommendation: string;
}
