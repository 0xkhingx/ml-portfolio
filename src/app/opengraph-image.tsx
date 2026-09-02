import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "0xkhingx — ML engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#121110",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "lowercase",
            color: "rgba(236,234,230,0.5)",
            fontFamily: "monospace",
          }}
        >
          0xkhingx · ml engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#eceae6",
              lineHeight: 1,
            }}
          >
            0xkhingx
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(236,234,230,0.7)",
              maxWidth: 640,
              lineHeight: 1.4,
            }}
          >
            ML engineer building models — and the products around them.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 13,
            color: "rgba(236,234,230,0.4)",
            fontFamily: "monospace",
            textTransform: "lowercase",
          }}
        >
          <span>work</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>writing</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>contact</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
