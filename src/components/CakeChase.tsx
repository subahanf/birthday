import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, RotateCcw } from "lucide-react";

export const CakeChase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [attempts, setAttempts] = useState(0);
  const [caught, setCaught] = useState(false);
  const [taunt, setTaunt] = useState<string | null>(null);

  const taunts = [
    "nope ✦",
    "too slow!",
    "miss ♥",
    "haha try again",
    "almost!",
    "not today",
    "🙅‍♀️",
    "psyche!",
  ];

  // After 8 attempts, the cake gives up and lets her catch it
  const willEscape = attempts < 8;

  const dodge = (clientX: number, clientY: number) => {
    if (caught) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;
    // current cake center in px
    const ccx = (pos.x / 100) * rect.width;
    const ccy = (pos.y / 100) * rect.height;
    const dx = ccx - cx;
    const dy = ccy - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 90) {
      // run away in opposite direction
      const angle = Math.atan2(dy, dx);
      const newX = ccx + Math.cos(angle) * 160 + (Math.random() - 0.5) * 80;
      const newY = ccy + Math.sin(angle) * 160 + (Math.random() - 0.5) * 80;
      const clampedX = Math.max(40, Math.min(rect.width - 40, newX));
      const clampedY = Math.max(40, Math.min(rect.height - 40, newY));
      setPos({ x: (clampedX / rect.width) * 100, y: (clampedY / rect.height) * 100 });
    }
  };

  const handleClick = () => {
    if (caught) return;
    if (willEscape) {
      setAttempts((a) => a + 1);
      setTaunt(taunts[Math.floor(Math.random() * taunts.length)]);
      setTimeout(() => setTaunt(null), 700);
    } else {
      setCaught(true);
    }
  };

  const reset = () => {
    setCaught(false);
    setAttempts(0);
    setPos({ x: 50, y: 50 });
  };

  return (
    <div className="paper-card p-5 md:p-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <p className="font-hand text-2xl text-primary">🎂 catch the cake</p>
          <p className="text-sm text-muted-foreground">
            {caught
              ? "fine, you got it. happy birthday ♥"
              : "click the cake. if you can."}
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          tries: {attempts}
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={(e) => dodge(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) dodge(t.clientX, t.clientY);
        }}
        className="relative w-full h-[320px] md:h-[380px] rounded-md bg-gradient-to-br from-secondary/20 via-background to-primary/10 overflow-hidden border border-border/60"
      >
        <motion.button
          onClick={handleClick}
          animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
          className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary flex items-center justify-center shadow-bow hover:bg-accent focus:outline-none focus:ring-4 focus:ring-primary/30"
          aria-label="cake"
        >
          <Cake className="w-8 h-8 md:w-10 md:h-10 text-secondary-foreground" strokeWidth={1.8} />
        </motion.button>

        <AnimatePresence>
          {taunt && (
            <motion.div
              key={taunt + attempts}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute font-hand text-2xl text-primary pointer-events-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -120%)" }}
            >
              {taunt}
            </motion.div>
          )}
        </AnimatePresence>

        {caught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-sm text-center px-6"
          >
            <p className="font-hand text-4xl text-primary mb-2">you got it! 🎉</p>
            <p className="font-display italic text-lg text-foreground/80 max-w-sm">
              alright fine, the cake surrenders. happy birthday hajira ♥
            </p>
            <button
              onClick={reset}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <RotateCcw className="w-4 h-4" /> play again
            </button>
          </motion.div>
        )}
      </div>

      {!caught && attempts >= 5 && (
        <p className="font-hand text-lg text-muted-foreground mt-3 text-center">
          ok ok keep trying, you'll get it eventually...
        </p>
      )}
    </div>
  );
};
