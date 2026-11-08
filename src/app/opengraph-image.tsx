import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "0xkhingx — Software Engineer";
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
          backgroundColor: "#fffdf6",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(226,212,224,0.9), transparent 55%), radial-gradient(circle at 100% 100%, rgba(148,154,177,0.45), transparent 55%)",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "lowercase",
            color: "#7c7e9d",
            fontFamily: "monospace",
          }}
        >
          0xkhingx · software engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#2b3049",
              lineHeight: 1,
            }}
          >
            0xkhingx
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#4c5372",
              maxWidth: 640,
              lineHeight: 1.4,
            }}
          >
            Software engineer building end-to-end products across the web and machine learning.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 13,
            color: "#7c7e9d",
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
