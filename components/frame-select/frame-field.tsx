interface FrameFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FrameField({ label, value, onChange, placeholder }: FrameFieldProps) {
  return (
    <label style={{ display: "block" }}>
      <div
        className="font-mono-booth"
        style={{
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "var(--ink)",
          opacity: 0.7,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono-booth w-full"
        style={{
          background: "var(--paper-2)",
          border: "2px solid var(--ink)",
          borderRadius: 6,
          padding: "8px 10px",
          fontSize: 13,
          color: "var(--ink)",
          outline: "none",
        }}
      />
    </label>
  );
}
