export function CurtainInterior() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "12%",
        bottom: 0,
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
          height: "28%",
          backgroundImage:
            "linear-gradient(45deg, var(--ink) 25%, transparent 25%), linear-gradient(-45deg, var(--ink) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--ink) 75%), linear-gradient(-45deg, transparent 75%, var(--ink) 75%)",
          backgroundSize: "12px 12px",
          backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0",
          backgroundColor: "var(--paper)",
          transform: "perspective(120px) rotateX(48deg)",
          transformOrigin: "bottom",
        }}
      />
      {/* stool top */}
      <div
        style={{
          position: "absolute",
          right: "14%",
          bottom: "8%",
          width: "42%",
          height: "10%",
          background: "var(--paper)",
          border: "1.5px solid var(--ink)",
          borderRadius: 3,
        }}
      />
      {/* stool leg */}
      <div
        style={{
          position: "absolute",
          right: "22%",
          bottom: 0,
          width: "24%",
          height: "8%",
          background: "var(--ink)",
        }}
      />
      {/* light bulb */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "5%",
          transform: "translateX(-50%)",
          width: "8%",
          aspectRatio: "1",
          minWidth: 10,
          borderRadius: "50%",
          background: "var(--gold)",
          boxShadow: "0 0 12px var(--gold), 0 0 24px rgba(245,197,66,0.5)",
        }}
      />
    </div>
  );
}
