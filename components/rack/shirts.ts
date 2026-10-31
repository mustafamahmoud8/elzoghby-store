export type GarmentKind = "shirt" | "pants";
export type SizedKind = GarmentKind | "shoes";

export type ShirtConfig = {
  id: string;
  name: string;
  price: string;
  texture: string;
  kind?: GarmentKind;
  side?: string;
  sideLeft?: string;
  soldOut?: string[];
};

export const SHIRTS: ShirtConfig[] = [
  { id: "race-knit-polo", name: "Race Knit Polo", price: "29,900 ج.م", texture: "/shirts/race-knit-polo.webp", side: "/shirts/race-knit-polo-side.webp", sideLeft: "/shirts/race-knit-polo-side-left.webp" },
  { id: "bsa-pocket-shirt", name: "BSA Pocket Shirt", price: "21,500 ج.م", texture: "/shirts/bsa-pocket-shirt.webp", side: "/shirts/bsa-pocket-shirt-side.webp", sideLeft: "/shirts/bsa-pocket-shirt-side-left.webp" },
  { id: "race-car-tee", name: "Race Car Tee", price: "14,200 ج.م", texture: "/shirts/race-car-tee.webp", side: "/shirts/race-car-tee-side.webp", sideLeft: "/shirts/race-car-tee-side-left.webp" },
  { id: "brown-pleated-trousers", name: "Pleated Wool Trousers", price: "20,600 ج.م", texture: "/shirts/brown-pleated-trousers.webp", kind: "pants" },
  { id: "mask-linen-shirt", name: "Tiki Linen Shirt", price: "27,700 ج.م", texture: "/shirts/mask-linen-shirt.webp", side: "/shirts/mask-linen-shirt-side.webp", sideLeft: "/shirts/mask-linen-shirt-side-left.webp" },
  { id: "line-face-shirt", name: "Faces Shirt", price: "23,300 ج.م", texture: "/shirts/line-face-shirt.webp", side: "/shirts/line-face-shirt-side.webp", sideLeft: "/shirts/line-face-shirt-side-left.webp" },
  { id: "pinstripe-trousers", name: "Pinstripe Trousers", price: "20,200 ج.م", texture: "/shirts/pinstripe-trousers.webp", kind: "pants" },
  { id: "giraffe-shirt", name: "Giraffe Shirt", price: "22,700 ج.م", texture: "/shirts/giraffe-shirt.webp", side: "/shirts/giraffe-shirt-side.webp", sideLeft: "/shirts/giraffe-shirt-side-left.webp" },
  { id: "utility-camp-shirt", name: "Utility Camp Shirt", price: "26,500 ج.م", texture: "/shirts/utility-camp-shirt.webp", side: "/shirts/utility-camp-shirt-side.webp", sideLeft: "/shirts/utility-camp-shirt-side-left.webp" },
  { id: "game-football-jersey", name: "Game F. Jersey", price: "17,300 ج.م", texture: "/shirts/game-football-jersey.webp", side: "/shirts/game-football-jersey-side.webp", sideLeft: "/shirts/game-football-jersey-side-left.webp" },
  { id: "stone-sweatpants", name: "Stone Sweatpants", price: "16,400 ج.م", texture: "/shirts/stone-sweatpants.webp", kind: "pants" },
  { id: "focus-polo", name: "Focus Polo", price: "18,300 ج.م", texture: "/shirts/focus-polo.webp", side: "/shirts/focus-polo-side.webp", sideLeft: "/shirts/focus-polo-side-left.webp" },
];

export const SIZES: Record<SizedKind, string[]> = {
  shirt: ["XS", "S", "M", "L", "XL", "XXL"],
  pants: ["28", "30", "32", "34", "36", "38"],
  shoes: ["40", "41", "42", "43", "44", "45", "46"],
};

export const INITIAL_INDEX = Math.floor((SHIRTS.length - 1) / 2);
