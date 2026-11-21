// Reihenfolge aller Kapitel im Spiel
import { CHAPTER1 } from "./content.js";
import { CHAPTER2 } from "./content_k2.js";
import { CHAPTER3 } from "./content_k3.js";
import { CHAPTER4 } from "./content_k4.js";
import { CHAPTER5 } from "./content_k5.js";
import { C2K1, C2K2, C2K3, C2K4, C2K5 } from "./content_c2.js";
import { C3K1, C3K2, C3K3, C3K4, C3K5 } from "./content_c3.js";
import { C4K1, C4K2, C4K3, C4K4 } from "./content_c4.js";
import { BILANZ, C5K1, C5K2, C5K3, C5K4, EPILOG } from "./content_c5.js";

export const CHAPTERS = [
  CHAPTER1, CHAPTER2, CHAPTER3, CHAPTER4, CHAPTER5,
  C2K1, C2K2, C2K3, C2K4, C2K5,
  C3K1, C3K2, C3K3, C3K4, C3K5,
  C4K1, C4K2, C4K3, C4K4,
  BILANZ,
  C5K1, C5K2, C5K3, C5K4,
  EPILOG,
];
