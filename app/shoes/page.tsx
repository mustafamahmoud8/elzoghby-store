import type { Metadata, Viewport } from "next";
import ShoesClient from "@/components/shoes/ShoesClient";
import { BACKGROUND } from "@/components/rack/constants";

export const metadata: Metadata = {
  title: "Shoes · ELZOGHBY STORE",
  description: "Shop shoes at ELZOGHBY STORE.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: BACKGROUND,
};

export default function ShoesPage() {
  return (
    <main className="h-dvh w-full" style={{ background: BACKGROUND }}>
      <ShoesClient />
    </main>
  );
}
