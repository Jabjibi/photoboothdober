import type { Metadata } from "next";
import { Bagel_Fat_One, Caveat, Space_Grotesk, Pirata_One, DM_Mono } from "next/font/google";
import "./globals.css";

const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
});

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space",
});

const pirataOne = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "SPARKLE BOOTH ✦ photo studio",
  description: "Step right up — your free digital photobooth. 4 shots, instant print.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        bagelFatOne.variable,
        caveat.variable,
        spaceGrotesk.variable,
        pirataOne.variable,
        dmMono.variable,
      ].join(" ")}
    >
      <body
        className="font-body min-h-dvh overflow-hidden antialiased"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        {children}
      </body>
    </html>
  );
}
