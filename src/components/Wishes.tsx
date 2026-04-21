import { motion } from "framer-motion";

const wishes = [
  { emoji: "🏔️", text: "may every climb feel lighter than the last" },
  { emoji: "☀️", text: "may your year be full of golden-hour kind of days" },
  { emoji: "📚", text: "may uni keep opening doors you didn't know existed" },
  { emoji: "🎒", text: "may every adventure remind you how brave you already are" },
  { emoji: "🌊", text: "may you find calm in the chaos and chaos in the calm" },
  { emoji: "✨", text: "may 20 be the softest, boldest year yet" },
];

export const Wishes = () => {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {wishes.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08 }}
          className="paper-card p-5 flex gap-4 items-start hover:shadow-soft transition-shadow"
        >
          <div className="text-3xl shrink-0">{w.emoji}</div>
          <p className="font-display text-lg italic text-foreground/85 leading-snug">
            {w.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
