import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Camera } from "lucide-react";

interface PhotoSlot {
  id: string;
  src?: string;
  caption: string;
  rotation: number;
}

const initialSlots: PhotoSlot[] = [
  { id: "1", caption: "that one hike", rotation: -3 },
  { id: "2", caption: "golden hour", rotation: 2 },
  { id: "3", caption: "best day", rotation: -1 },
  { id: "4", caption: "remember this?", rotation: 4 },
  { id: "5", caption: "adventures", rotation: -2 },
  { id: "6", caption: "you, glowing", rotation: 3 },
];

export const PhotoGallery = () => {
  const [slots, setSlots] = useState<PhotoSlot[]>(initialSlots);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSlots((prev) =>
        prev.map((s) => (s.id === id ? { ...s, src: e.target?.result as string } : s))
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (id: string) => {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, src: undefined } : s)));
  };

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
          <input
            ref={(el) => (inputRefs.current[slot.id] = el)}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(slot.id, file);
            }}
          />

          <div className="aspect-square bg-muted/60 overflow-hidden relative">
            {slot.src ? (
              <>
                <img src={slot.src} alt={slot.caption} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemove(slot.id)}
                  className="absolute top-2 right-2 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => inputRefs.current[slot.id]?.click()}
                className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors"
              >
                <Camera className="w-8 h-8" strokeWidth={1.5} />
                <span className="text-xs font-medium">add photo</span>
              </button>
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
