import pdan from "../assets/pdan.jpg";
import pSusan from "../assets/pSusan.jpg";
import pastor from "../assets/pdede.png";
import oriang from "../assets/oriang_pastor.jpg";
import pas from "../assets/Bishop.webp";
import past from "../assets/p.Rose.png";
import kanyipir from "../assets/kanyipir_pastor.jpeg";
import rawinji from "../assets/rawinji_pastor.jpeg";
import matharedp from "../assets/matharedp.jpg";
import plily from "../assets/plily.png";
import prose from "../assets/pRose.jpg";
import pJamo from "../assets/jamo.jpg";
import pEva from "../assets/pEva.avif";
import pSamy from "../assets/pSamy.avif";

// Pastor images mapping
export const pastorImages = {
  "Pastor Dancun Ongoro": pdan,
  "Pastor Susan Omondi": pSusan,
  "Pastor Rosemary": prose,
  "Pastor Lilian": plily,
  "Pastor Fred Dede": pastor,
  "Pastor Oromo Samson": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "Pastor James Ochieng": pJamo,
  "Pastor John Ouru": oriang,
  "Gibson Onunga": pas,
  "Teresa Owiti": past,
  "Pastor Mathews Bollo": kanyipir,
  "Pastor Evaline": pEva,
  "Pastor Samuel Muga": pSamy,
};

// Default pastor image if not found
export const getPastorImage = (pastorName) => {
  return pastorImages[pastorName] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80";
};