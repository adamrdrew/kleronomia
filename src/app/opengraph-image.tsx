import { ImageResponse } from "next/og";
export const alt =
  "The Kleronomia Society — We are the ancestors of something extraordinary.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#F5F2EA",
        color: "#171B1D",
        padding: "64px 72px",
        borderTop: "10px solid #B08B4D",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 23,
          letterSpacing: 5,
        }}
      >
        <svg width="54" height="54" viewBox="0 0 48 48">
          <path
            d="M10 5v38M15 24 38 5M15 24l23 19M19 24 42 5M19 24l23 19"
            stroke="#B08B4D"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        THE KLERONOMIA SOCIETY
      </div>
      <div
        style={{
          fontFamily: "serif",
          fontSize: 87,
          lineHeight: 1.04,
          letterSpacing: -3,
          marginTop: 65,
          maxWidth: 990,
        }}
      >
        We are the ancestors of something extraordinary.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #D9D1C3",
          paddingTop: 24,
          marginTop: "auto",
          fontSize: 18,
          color: "#62676B",
        }}
      >
        <span>The future is our inheritance.</span>
        <span>INTELLIGENCE · HUMANITY · POSSIBILITY</span>
      </div>
    </div>,
    size,
  );
}
