import { motion } from "framer-motion";

const hopes = [
  { emoji: "📚", text: "that uni keeps going well and you keep enjoying being there" },
  { emoji: "☀️", text: "that u don't let anyone get to u easily, just be urself" },
  { emoji: "💬", text: "that u get everything u ask for (Inshallah)" },
  { emoji: "🤍", text: "that ur twenty is better than the years before it" },
];

export const Wishes = () => {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {hopes.map((w, i) => (
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
