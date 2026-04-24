import { useState } from "react";
import { motion } from "framer-motion";
import imgMap from "@/assets/adventure-map.jpg";
import imgHero from "@/assets/mountain-hero.jpg";
import imgGift from "@/assets/gift-box.png";
import prom from "@/assets/prom2.png";

interface PhotoSlot {
  id: string;
  src?: string;
  caption: string;
  rotation: number;
}

const initialSlots: PhotoSlot[] = [
  { id: "1", caption: "prom night", rotation: -3, src: prom },
  { id: "2", caption: "bowling (i won)", rotation: 2, src: imgHero },
  { id: "3", caption: "ice skating", rotation: -1, src: imgGift },
  { id: "4", caption: "bike rides", rotation: 4, src: imgMap },
  { id: "5", caption: "random day", rotation: -2, src: imgHero },
  { id: "6", caption: "good times", rotation: 3, src: imgGift },
];

export const PhotoGallery = () => {
  const [slots] = useState<PhotoSlot[]>(initialSlots);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.id}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: slot.rotation }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          className="relative paper-card p-3 pb-12 group"
        >
          <div className="aspect-square bg-muted/60 overflow-hidden relative">
            {slot.src && (
              <img src={slot.src} alt={slot.caption} className="w-full h-full object-cover" />
            )}
          </div>

          <p className="font-hand text-2xl text-center mt-3 text-foreground/80">
            {slot.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
