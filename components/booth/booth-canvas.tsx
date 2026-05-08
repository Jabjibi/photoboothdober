import { MarqueeRow } from "@/components/shared/marquee-row";
import { Star5 } from "@/components/shared/star5";
import { Sparkle } from "@/components/shared/sparkle";

interface BoothCanvasProps {
  curtainOpen?: boolean;
}

export function BoothCanvas({ curtainOpen = false }: BoothCanvasProps) {
  return (
    <div
      className="relative"
      style={{ width: "clamp(280px, 46vw, 460px)", aspectRatio: "460/600" }}
    >
      {/* drop shadow */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: -16,
          height: 26,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35), transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* TOP SIGN */}
      <div
        style={{
          position: "absolute",
          left: "4%",
          right: "4%",
          top: 0,
          height: "15.3%",
          background: "var(--paper)",
          border: "4px solid var(--ink)",
          borderRadius: 12,
          boxShadow: "0 6px 0 var(--ink)",
          padding: "8px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 5,
        }}
      >
        <MarqueeRow count={16} />
        <div
          className="font-display"
          style={{
            textAlign: "center",
            fontSize: "clamp(16px, 2.5vw, 32px)",
            lineHeight: 1,
            color: "var(--red)",
            WebkitTextStroke: "1.2px var(--ink)",
          }}
        >
          ✦ SPARKLE BOOTH ✦
        </div>
        <MarqueeRow count={16} />
      </div>

      {/* sign legs */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "14.7%",
          width: 6,
          height: "2.3%",
          background: "var(--ink)",
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          top: "14.7%",
          width: 6,
          height: "2.3%",
          background: "var(--ink)",
          zIndex: 4,
        }}
      />

      {/* BOOTH BODY */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "16.7%",
          bottom: "4%",
          background: "var(--red)",
          border: "5px solid var(--ink)",
          borderRadius: 14,
          boxShadow: "inset 0 -30px 0 var(--red-deep), 0 8px 0 var(--ink)",
          overflow: "hidden",
        }}
      >
        {/* diagonal stripe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 22px)",
            pointerEvents: "none",
          }}
        />

        {/* LEFT PANEL — poster */}
        <div
          style={{
            position: "absolute",
            left: "3.9%",
            top: "3.6%",
            width: "32.6%",
            height: "48.8%",
            background: "var(--paper)",
            border: "3px solid var(--ink)",
            borderRadius: 10,
            boxShadow: "4px 4px 0 var(--ink)",
            transform: "rotate(-3deg)",
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div className="font-hand" style={{ fontSize: 18, color: "var(--ink)" }}>
            say cheese!
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1].map((s) => (
              <div
                key={s}
                style={{
                  width: 36,
                  height: 110,
                  background: "var(--ink)",
                  border: "2px solid var(--ink)",
                  padding: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: i % 2 === 0 ? "var(--red-soft)" : "var(--paper-2)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* burst / FREE! badge */}
          <svg viewBox="0 0 100 60" style={{ width: 90, height: 54, marginTop: 2 }}>
            <path
              d="M50 2 L57 12 L70 6 L68 19 L82 22 L72 32 L84 42 L70 44 L72 58 L58 50 L50 60 L42 50 L28 58 L30 44 L16 42 L28 32 L18 22 L32 19 L30 6 L43 12 Z"
              fill="var(--red)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              x="50"
              y="36"
              textAnchor="middle"
              fontFamily="var(--font-bagel), sans-serif"
              fontSize="18"
              fill="var(--paper)"
            >
              FREE!
            </text>
          </svg>
          <div
            className="font-display"
            style={{ fontSize: 14, letterSpacing: "0.15em", color: "var(--ink)" }}
          >
            PHOTOS
          </div>
        </div>

        {/* heart sticker */}
        <div style={{ position: "absolute", left: "3%", top: "55%", transform: "rotate(-12deg)" }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.6"
          >
            <path d="M12 21s-7-4.5-9.5-9C.7 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.3 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </div>

        {/* SLOT — print output */}
        <div style={{ position: "absolute", left: "6.5%", top: "67%" }}>
          <div
            style={{
              width: 90,
              height: 56,
              background: "var(--ink)",
              border: "3px solid var(--ink)",
              borderRadius: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 8,
                right: 8,
                top: "50%",
                height: 4,
                background: "var(--paper)",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <div
            className="font-mono-booth"
            style={{
              fontSize: 10,
              color: "var(--paper)",
              background: "var(--ink)",
              padding: "2px 6px",
              display: "inline-block",
              marginTop: 4,
              letterSpacing: "0.1em",
            }}
          >
            ↓ PRINTS HERE
          </div>
        </div>

        {/* smiley sticker */}
        <div
          style={{
            position: "absolute",
            left: "3.9%",
            bottom: "6%",
            transform: "rotate(-6deg)",
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="var(--gold)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="20" cy="24" r="2.5" fill="var(--ink)" />
            <circle cx="36" cy="24" r="2.5" fill="var(--ink)" />
            <path
              d="M18 32 Q28 42 38 32"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* CURTAIN AREA — right 60% */}
        <div
          style={{
            position: "absolute",
            right: "3.9%",
            top: "3.6%",
            bottom: "12.3%",
            width: "52.2%",
            background: "var(--ink)",
            border: "3px solid var(--ink)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {/* pelmet / awning */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 30,
              background:
                "repeating-linear-gradient(90deg, var(--red) 0 16px, var(--paper) 16px 32px)",
              borderBottom: "3px solid var(--ink)",
              zIndex: 6,
            }}
          />

          {/* interior */}
          <div
            style={{
              position: "absolute",
              inset: 30,
              top: 30,
              background: "linear-gradient(180deg, #2a1010 0%, #5e1d1d 60%, #7a2828 100%)",
            }}
          >
            {/* checker floor */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 64,
                backgroundImage:
                  "linear-gradient(45deg, var(--ink) 25%, transparent 25%), linear-gradient(-45deg, var(--ink) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--ink) 75%), linear-gradient(-45deg, transparent 75%, var(--ink) 75%)",
                backgroundSize: "14px 14px",
                backgroundPosition: "0 0, 0 7px, 7px -7px, -7px 0",
                backgroundColor: "var(--paper)",
                transform: "perspective(160px) rotateX(48deg)",
                transformOrigin: "bottom",
              }}
            />
            {/* stool top */}
            <div
              style={{
                position: "absolute",
                right: 22,
                bottom: 18,
                width: 70,
                height: 30,
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                borderRadius: 4,
              }}
            />
            {/* stool leg */}
            <div
              style={{
                position: "absolute",
                right: 36,
                bottom: 0,
                width: 40,
                height: 22,
                background: "var(--ink)",
              }}
            />
            {/* light bulb */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 4,
                transform: "translateX(-50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "var(--gold)",
                boxShadow: "0 0 16px var(--gold), 0 0 30px rgba(245,197,66,0.6)",
              }}
            />
          </div>

          {/* CURTAIN halves — GSAP targets */}
          <div
            data-curtain="left"
            style={{
              position: "absolute",
              left: 0,
              top: 30,
              bottom: 0,
              width: "52%",
              background:
                "repeating-linear-gradient(90deg, var(--paper) 0 14px, var(--paper-2) 14px 18px, var(--paper) 18px 28px)",
              borderRight: "2px solid var(--ink)",
              zIndex: 5,
              boxShadow: "inset -8px 0 16px rgba(0,0,0,0.2)",
              transformOrigin: "top",
              ...(curtainOpen ? { transform: "translateY(-110%)" } : {}),
              transition: curtainOpen ? "transform 1.4s 0.4s cubic-bezier(.6,0,.3,1)" : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 18,
                background:
                  "radial-gradient(circle at 12% 0, var(--paper) 14px, transparent 15px) repeat-x",
                backgroundSize: "26px 18px",
              }}
            />
          </div>
          <div
            data-curtain="right"
            style={{
              position: "absolute",
              right: 0,
              top: 30,
              bottom: 0,
              width: "52%",
              background:
                "repeating-linear-gradient(90deg, var(--paper) 0 14px, var(--paper-2) 14px 18px, var(--paper) 18px 28px)",
              borderLeft: "2px solid var(--ink)",
              zIndex: 5,
              boxShadow: "inset 8px 0 16px rgba(0,0,0,0.2)",
              transformOrigin: "top",
              ...(curtainOpen ? { transform: "translateY(-110%)" } : {}),
              transition: curtainOpen ? "transform 1.4s 0.4s cubic-bezier(.6,0,.3,1)" : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 18,
                background:
                  "radial-gradient(circle at 12% 0, var(--paper) 14px, transparent 15px) repeat-x",
                backgroundSize: "26px 18px",
              }}
            />
          </div>

          {/* curtain rod */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 28,
              height: 6,
              background: "var(--ink)",
              zIndex: 7,
            }}
          />
        </div>

        {/* base step */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "3.7%",
            background: "var(--ink)",
          }}
        />

        {/* mini stickers */}
        <Star5 x={42} y={8} size={20} color="var(--gold)" rotate={-8} delay={0.2} />
        <Sparkle x={38} y={50} size={16} color="var(--paper)" delay={0.4} />
        <Star5 x={94} y={84} size={16} color="var(--gold)" rotate={20} delay={0.8} />
      </div>
    </div>
  );
}
