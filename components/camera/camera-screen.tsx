"use client";

import type { LayoutId } from "@/lib/booth-context";
import { LAYOUTS } from "@/components/frames";
import { useCamera } from "@/lib/hook/use-camera";
import { useFilter } from "@/lib/hook/use-filter";
import { usePhotoSession } from "@/lib/hook/use-photo-session";
import { CameraHeader } from "./camera-header";
import { CameraViewport } from "./camera-viewport";
import { FilterRow } from "./filter-row";
import { ShotGrid } from "./shot-grid";
import { ShootCard } from "./shoot-card";
import { TipsCard } from "./tips-card";

interface CameraScreenProps {
  layoutId: LayoutId;
  onComplete: (photos: string[]) => void;
  onBack: () => void;
}

export function CameraScreen({ layoutId, onComplete, onBack }: CameraScreenProps) {
  const layout = LAYOUTS[layoutId];
  const totalShots = layout.shots;

  const { videoRef, stoppedRef, cameraReady, cameraError } = useCamera();
  const { filter, setFilter, filterCss } = useFilter();
  const { photos, shotIdx, count, running, flash, runSession, runDemo } = usePhotoSession({
    videoRef,
    stoppedRef,
    cameraReady,
    filter,
    totalShots,
    onComplete,
  });

  return (
    <div
      className="relative h-full w-full overflow-auto px-4 pb-5 sm:px-6 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: viewport ── */}
        <div className="flex min-h-0 flex-col gap-3">
          <CameraHeader totalShots={totalShots} onBack={onBack} />
          <CameraViewport
            videoRef={videoRef}
            filterCss={filterCss}
            shotIdx={shotIdx}
            totalShots={totalShots}
            count={count}
            flash={flash}
            cameraError={cameraError}
            onDemo={runDemo}
          />
          <FilterRow filter={filter} setFilter={setFilter} running={running} />
        </div>

        {/* ── RIGHT: controls + shot tracker ── */}
        <div className="flex flex-col gap-4">
          <ShootCard
            cameraReady={cameraReady}
            cameraError={cameraError}
            running={running}
            photosDone={photos.length === totalShots}
            onStart={runSession}
          />
          <ShotGrid
            photos={photos}
            totalShots={totalShots}
            shotIdx={shotIdx}
            running={running}
            layoutName={layout.name}
          />
          <TipsCard />
        </div>
      </div>
    </div>
  );
}
