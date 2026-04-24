import { motion } from "framer-motion";
import { useState } from "react";
import giftBox from "@/assets/gift-box.png";

interface GiftUnwrapProps {
  onOpen: () => void;
  recipientName: string;
}

export const GiftUnwrap = ({ onOpen, recipientName }: GiftUnwrapProps) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onOpen, 1600);
  };

  // Confetti pieces
  const confetti = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-grad overflow-hidden">
      {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-background/40 blur-2xl"
            style={{
              width: 120 + i * 30,
              height: 60 + i * 12,
              top: `${10 + i * 13}%`,
              left: `${(i * 17) % 90}%`,
            }}
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6 px-6 relative z-10"
      >
        <p className="font-hand text-2xl text-primary/80">Happy Birthday</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mt-2">
          {recipientName}
        </h1>
        <p className="font-hand text-xl text-foreground/70 mt-3">tap the gift to unwrap ✨</p>
      </motion.div>

      <motion.button
        onClick={handleOpen}
        disabled={opening}
        className="relative cursor-pointer focus:outline-none"
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={
          opening
            ? { scale: [1, 1.2, 0], rotate: [0, 15, -15, 0], opacity: [1, 1, 0] }
            : { y: [0, -10, 0] }
        }
        transition={
          opening
            ? { duration: 1.4, ease: "easeInOut" }
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <img
          src={giftBox}
          alt="Birthday gift"
          width={400}
          height={400}
          className="w-64 md:w-80 drop-shadow-2xl"
        />
      </motion.button>

      {/* Confetti burst */}
      {opening &&
        confetti.map((_, i) => {
          const colors = ["bg-secondary", "bg-primary", "bg-accent", "bg-foreground"];
          return (
            <motion.div
              key={i}
              className={`absolute w-3 h-4 ${colors[i % 4]} rounded-sm`}
              style={{ left: "50%", top: "55%" }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                rotate: Math.random() * 720,
                opacity: 0,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          );
        })}
    </div>
  );
};
