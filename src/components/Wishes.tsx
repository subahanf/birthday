import { motion } from "framer-motion";

const wishes = [
  { emoji: "📚", text: "that uni keeps treating you well — and that you keep crushing it like you have been" },
  { emoji: "☀️", text: "more random good days. the kind you don't plan, that just turn out great" },
  { emoji: "🎳", text: "at least one more bowling night where you actually beat me (kidding)" },
  { emoji: "🚲", text: "long bike rides with no real destination" },
  { emoji: "💬", text: "that the people around you make you feel as easy to be around as you are" },
  { emoji: "✨", text: "twenty being a year that feels lighter than the last one" },
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
