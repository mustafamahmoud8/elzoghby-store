import type { Metadata, Viewport } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "إتمام الطلب · ELZOGHBY STORE",
  description: "أكمل طلبك من ELZOGHBY STORE.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#ebe8e3",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
