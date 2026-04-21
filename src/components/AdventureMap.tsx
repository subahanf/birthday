import { motion } from "framer-motion";
import adventureMap from "@/assets/adventure-map.jpg";

const pins = [
  { x: 25, y: 35, label: "where it began" },
  { x: 55, y: 25, label: "the long hike" },
  { x: 70, y: 55, label: "summit day" },
  { x: 38, y: 65, label: "lake spot" },
  { x: 80, y: 40, label: "secret view" },
];

export const AdventureMap = () => {
  return (
    <div className="relative paper-card p-4 md:p-6 overflow-hidden">
      <div className="relative">
        <img
          src={adventureMap}
          alt="Adventure map"
          width={1536}
          height={1024}
          loading="lazy"
          className="w-full rounded-md sepia-[0.1]"
        />
        {pins.map((p, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, y: -20 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
            className="absolute group"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-full">
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-primary rounded-full" />
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary border-2 md:border-4 border-background shadow-soft animate-shimmer" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap bg-foreground text-background px-2 py-1 rounded text-xs font-hand text-base opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {p.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="font-hand text-center text-2xl mt-4 text-foreground/70">
        every pin = a memory worth chasing again
      </p>
    </div>
  );
};
