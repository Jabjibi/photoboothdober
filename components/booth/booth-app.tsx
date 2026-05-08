"use client";

import { useBoothContext } from "@/lib/booth-context";
import { BoothNav } from "@/components/booth/booth-nav";
import { BoothScreen } from "@/components/booth/booth-screen";
import { FrameSelectScreen } from "@/components/frame-select/frame-select-screen";
import { CameraScreen } from "@/components/camera/camera-screen";
import { ResultScreen } from "@/components/result/result-screen";

const STEP_MAP = { booth: "BOOTH", frame: "FRAME", camera: "CAMERA", result: "PRINT" } as const;

export function BoothApp() {
  const { state, actions } = useBoothContext();
  const { screen, config, photos } = state;

  return (
    <div className="relative h-dvh w-full overflow-hidden" style={{ background: "var(--paper)" }}>
      <BoothNav currentStep={STEP_MAP[screen]} />

      {screen === "booth" && <BoothScreen onStart={() => actions.goTo("frame")} />}

      {screen === "frame" && (
        <FrameSelectScreen
          initialLayoutId={config.layoutId}
          initialStyleId={config.styleId}
          initialMeta={config.meta}
          onConfirm={(cfg) => {
            actions.setConfig(cfg);
            actions.goTo("camera");
          }}
          onBack={() => actions.goTo("booth")}
        />
      )}

      {screen === "camera" && (
        <CameraScreen
          layoutId={config.layoutId}
          onComplete={(p) => {
            actions.setPhotos(p);
            actions.goTo("result");
          }}
          onBack={() => actions.goTo("frame")}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          photos={photos}
          layoutId={config.layoutId}
          styleId={config.styleId}
          meta={config.meta}
          onRestart={actions.restart}
          onRetake={() => actions.goTo("camera")}
        />
      )}
    </div>
  );
}
