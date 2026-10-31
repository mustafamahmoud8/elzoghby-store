import type { Metadata, Viewport } from "next";
import RackClient from "@/components/rack/RackClient";

export const metadata: Metadata = {
  title: "Clothes · ELZOGHBY STORE",
  description: "Shop clothes at ELZOGHBY STORE.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#ebe8e3",
};

export default function RackPage() {
  return (
    <main className="h-dvh w-full bg-[#ebe8e3]">
      <RackClient />
    </main>
  );
}
