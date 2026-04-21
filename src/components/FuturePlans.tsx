import { motion } from "framer-motion";
import { Mountain, Tent, Coffee, Camera, Plane, Sunrise } from "lucide-react";

const plans = [
  { icon: Mountain, title: "Conquer a peak together", note: "your pick, your pace" },
  { icon: Tent, title: "A weekend under the stars", note: "marshmallows mandatory" },
  { icon: Coffee, title: "That café we keep saying we'll try", note: "next time you're back" },
  { icon: Sunrise, title: "Catch a sunrise somewhere new", note: "alarms set, no excuses" },
  { icon: Camera, title: "A proper photo day", note: "blackmail material guaranteed" },
  { icon: Plane, title: "A trip — even a tiny one", note: "passport optional, vibes required" },
];

export const FuturePlans = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {plans.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="relative paper-card p-6 group cursor-default"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-1">{p.title}</h3>
            <p className="font-hand text-xl text-muted-foreground">{p.note}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
