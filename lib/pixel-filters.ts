import { type FilterId } from "./hook/use-filter";

function clamp(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function applyGrayscale(d: Uint8ClampedArray, amount: number): void {
  for (let i = 0; i < d.length; i += 4) {
    const lum = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
    d[i]     = clamp(d[i]     + (lum - d[i])     * amount);
    d[i + 1] = clamp(d[i + 1] + (lum - d[i + 1]) * amount);
    d[i + 2] = clamp(d[i + 2] + (lum - d[i + 2]) * amount);
  }
}

function applyContrast(d: Uint8ClampedArray, amount: number): void {
  for (let i = 0; i < d.length; i += 4) {
    d[i]     = clamp((d[i]     - 128) * amount + 128);
    d[i + 1] = clamp((d[i + 1] - 128) * amount + 128);
    d[i + 2] = clamp((d[i + 2] - 128) * amount + 128);
  }
}

function applyBrightness(d: Uint8ClampedArray, amount: number): void {
  for (let i = 0; i < d.length; i += 4) {
    d[i]     = clamp(d[i]     * amount);
    d[i + 1] = clamp(d[i + 1] * amount);
    d[i + 2] = clamp(d[i + 2] * amount);
  }
}

function applySepia(d: Uint8ClampedArray, amount: number): void {
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    d[i]     = clamp(r * (1 - 0.607 * amount) + g * 0.769 * amount + b * 0.189 * amount);
    d[i + 1] = clamp(r * 0.349 * amount       + g * (1 - 0.314 * amount) + b * 0.168 * amount);
    d[i + 2] = clamp(r * 0.272 * amount       + g * 0.534 * amount + b * (1 - 0.869 * amount));
  }
}

function applySaturate(d: Uint8ClampedArray, amount: number): void {
  const s = amount;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    d[i]     = clamp(r * (0.213 + 0.787 * s) + g * (0.715 - 0.715 * s) + b * (0.072 - 0.072 * s));
    d[i + 1] = clamp(r * (0.213 - 0.213 * s) + g * (0.715 + 0.285 * s) + b * (0.072 - 0.072 * s));
    d[i + 2] = clamp(r * (0.213 - 0.213 * s) + g * (0.715 - 0.715 * s) + b * (0.072 + 0.928 * s));
  }
}

function applyHueRotate(d: Uint8ClampedArray, degrees: number): void {
  const rad = (degrees * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const m = [
    0.213 + c * 0.787 - s * 0.213,  0.715 - c * 0.715 - s * 0.715,  0.072 - c * 0.072 + s * 0.928,
    0.213 - c * 0.213 + s * 0.143,  0.715 + c * 0.285 + s * 0.140,  0.072 - c * 0.072 - s * 0.283,
    0.213 - c * 0.213 - s * 0.787,  0.715 - c * 0.715 + s * 0.715,  0.072 + c * 0.928 + s * 0.072,
  ];
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    d[i]     = clamp(r * m[0] + g * m[1] + b * m[2]);
    d[i + 1] = clamp(r * m[3] + g * m[4] + b * m[5]);
    d[i + 2] = clamp(r * m[6] + g * m[7] + b * m[8]);
  }
}

export function bakeFilter(data: Uint8ClampedArray, filterId: FilterId): void {
  switch (filterId) {
    case "bw":
      applyGrayscale(data, 1);
      applyContrast(data, 1.05);
      break;
    case "warm":
      applySaturate(data, 1.15);
      applySepia(data, 0.18);
      applyContrast(data, 1.05);
      break;
    case "fairy":
      applySaturate(data, 1.3);
      applyBrightness(data, 1.05);
      applyHueRotate(data, -8);
      break;
    case "noir":
      applyGrayscale(data, 1);
      applyContrast(data, 1.4);
      applyBrightness(data, 0.92);
      break;
  }
}
