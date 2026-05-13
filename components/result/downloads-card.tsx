"use client";

import { Clapperboard, Film, Images } from "lucide-react";
import { DownloadButton } from "./download-button";
import w from "@/lib/wording.json";

interface DownloadsCardProps {
  photoCount: number;
  onDownloadStrip: () => void;
  onDownloadPhotos: () => void;
  onDownloadVideo: () => void;
}

export function DownloadsCard({
  photoCount,
  onDownloadStrip,
  onDownloadPhotos,
  onDownloadVideo,
}: DownloadsCardProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--red)",
      }}
    >
      <p className="font-display text-lg">{w.result.downloads.sectionTitle}</p>
      <p className="font-mono-booth mb-4 text-[9px] tracking-[0.18em] opacity-70">
        {w.result.downloads.sectionSub}
      </p>
      <div className="flex flex-col gap-2">
        <DownloadButton
          icon={Film}
          title={w.result.downloads.strip.label}
          sub={w.result.downloads.strip.sub}
          onClick={onDownloadStrip}
        />
        <DownloadButton
          icon={Images}
          title={w.result.downloads.photos.label}
          sub={`${photoCount} ${w.result.downloads.photos.sub}`}
          onClick={onDownloadPhotos}
        />
        <DownloadButton
          icon={Clapperboard}
          title={w.result.downloads.video.label}
          sub={w.result.downloads.video.sub}
          onClick={onDownloadVideo}
        />
      </div>
    </div>
  );
}
