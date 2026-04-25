import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgMap from "@/assets/adventure-map.jpg";
import imgHero from "@/assets/mountain-hero.jpg";
import imgGift from "@/assets/gift-box.png";
import prom1 from "@/assets/prom.jpeg";
import prom2 from "@/assets/prom2.jpeg";
import bike from "@/assets/bike.jpeg";
import skate from "@/assets/ice.jpeg";
import skate2 from "@/assets/ice2.jpeg";
import bike2 from "@/assets/bike.MOV";



interface PhotoSlot {
  id: string;
  src: string[]; // allow multiple images per slot
  caption: string;
  rotation: number;
}

const initialSlots: PhotoSlot[] = [
  { id: "1", caption: "prom night", rotation: -3, src: [prom1, prom2] },
  { id: "2", caption: "bowling (i won)", rotation: 2, src: [imgHero] },
  { id: "3", caption: "ice skating", rotation: -1, src: [skate, skate2] },
  { id: "4", caption: "bike rides", rotation: 4, src: [bike, bike2] },
  { id: "5", caption: "random day", rotation: -2, src: [imgHero] },
  { id: "6", caption: "good times", rotation: 3, src: [imgGift] },
];

function PhotoFrame({ images, caption, rotation }: { images: string[]; caption: string; rotation: number }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative">
      <div className="aspect-square bg-muted/60 overflow-hidden relative" style={{ transform: `rotate(${rotation}deg)` }}>
        {images && images.length > 0 && (
          <AnimatePresence mode="wait">
            {(() => {
              const src = images[index];
              const isVideo = /\.(mp4|webm|mov)$/i.test(src);
              if (isVideo) {
                return (
                  <motion.video
                    key={src}
                    src={src}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    playsInline
                    muted
                    loop
                    controls
                  />
                );
              }

              return (
                <motion.img
                  key={src}
                  src={src}
                  alt={caption}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              );
            })()}
          </AnimatePresence>
        )}
      </div>

      {images && images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === index ? "bg-primary" : "bg-background/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const PhotoGallery = () => {
  const [slots] = useState<PhotoSlot[]>(initialSlots);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.id}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          className="relative paper-card p-3 pb-12 group"
        >
          <PhotoFrame images={slot.src} caption={slot.caption} rotation={slot.rotation} />

          <p className="font-hand text-2xl text-center mt-3 text-foreground/80">
            {slot.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
