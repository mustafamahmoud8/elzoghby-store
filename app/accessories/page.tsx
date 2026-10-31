import type { Metadata, Viewport } from "next";
import AccessoriesClient from "@/components/accessories/AccessoriesClient";
import { BACKGROUND } from "@/components/rack/constants";

export const metadata: Metadata = {
  title: "Accessories · ELZOGHBY STORE",
  description: "Shop watches and accessories at ELZOGHBY STORE.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: BACKGROUND,
};

export default function AccessoriesPage() {
  return (
    <main className="h-dvh w-full" style={{ background: BACKGROUND }}>
      <AccessoriesClient />
    </main>
  );
}
