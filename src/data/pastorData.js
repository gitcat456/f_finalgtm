import pdan from "../assets/pdan.jpg";
import pSusan from "../assets/pSusan.jpg";
import pastor from "../assets/p.Dede.jpg";
import oriang from "../assets/pastors/oriang_pastor.jpeg";
import pas from "../assets/Bishop.png";
import past from "../assets/p.Rose.png";
import pasto from "../assets/p.James.jpg";
import kanyipir from "../assets/pastors/kanyipir_pastor.jpeg";
import rawinji from "../assets/pastors/rawinji_pastor.jpeg";
import matharedp from "../assets/matharedp.jpg";

// Pastor images mapping
export const pastorImages = {
  "Pastor Dancun Ongoro": pdan,
  "Pastor Susan Omondi": pSusan,
  "Pastor Rosemary": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "Pastor Lilian": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "Pastor Fred Dede": pastor,
  "Pastor Oromo Samson": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "Pastor James Ochieng": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80",
  "Pastor John Ouru": oriang,
  "Gibson Onunga": pas,
  "Teresa Owiti": past,
  "Justus Omundo": pasto
};

// Default pastor image if not found
export const getPastorImage = (pastorName) => {
  return pastorImages[pastorName] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80";
};