interface PhotoCellProps {
  src?: string;
  label?: string;
  placeholder?: string;
  aspect?: number;
  ink?: string;
}

export function PhotoCell({
  src,
  label,
  placeholder = "PHOTO",
  aspect = 1,
  ink = "#161313",
}: PhotoCellProps) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: aspect,
        background: src ? "transparent" : "#bdb3a3",
        border: `2px solid ${ink}`,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span
          className="font-mono-booth"
          style={{ fontSize: 11, color: ink, opacity: 0.5, letterSpacing: "0.15em" }}
        >
          {placeholder}
          {label ? ` ${label}` : ""}
        </span>
      )}
    </div>
  );
}
