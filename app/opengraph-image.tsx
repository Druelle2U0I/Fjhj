import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "ENMA Formation — Organisme de formation Qualiopi Hauts-de-France";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public/brand/logo-wordmark.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b032b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "rgba(255, 249, 199, 0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255, 249, 199, 0.06)",
            display: "flex",
          }}
        />
        <img
          src={logoSrc}
          alt=""
          width={340}
          height={141}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 44,
            fontSize: 42,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
            display: "flex",
          }}
        >
          Vos équipes méritent le meilleur.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#d4e3fe",
            textAlign: "center",
            display: "flex",
          }}
        >
          Organisme de formation certifié Qualiopi · Hauts-de-France
        </div>
      </div>
    ),
    { ...size },
  );
}
