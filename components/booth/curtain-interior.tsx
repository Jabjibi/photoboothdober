export function CurtainInterior() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
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
  );
}
