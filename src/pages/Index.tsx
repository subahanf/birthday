import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GiftUnwrap } from "@/components/GiftUnwrap";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Wishes } from "@/components/Wishes";
import { CakeChase } from "@/components/CakeChase";

const RECIPIENT = "Hajira";

const LETTER = `Happy Birthday Hajira!!! It's crazy time actually flies by so quickly. It's already been almost more than a year since u went back. But I am super happy for you that you are doing great in uni and are attending one of the best uni's there. You will do great in the future, I have no doubt about it. Don't let anyone or anything get to you, especially the "lads" there 😂. I am always here if you ever need anything. Call or msg anytime. Happy 20th birthday Hajira ♥, enjoy your day and enjoy your offical non-teen years.`;

type View = "menu" | "memories" | "letter" | "hopes" | "game";

interface Card {
  id: View;
  title: string;
  subtitle: string;
  emoji: string;
}

const cards: Card[] = [
  { id: "memories", title: "our memories", emoji: "📸" },
  { id: "letter", title: "a note for you", emoji: "✉️" },
  { id: "hopes", title: "things i hope for you", emoji: "🤍" },
  { id: "game", title: "catch the cake", subtitle: "if you can. good luck.", emoji: "🎂" },
];

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [view, setView] = useState<View>("menu");

  return (
    <main className="min-h-screen bg-paper">
      {!opened && <GiftUnwrap recipientName={RECIPIENT} onOpen={() => setOpened(true)} />}

      {opened && (
        <div className="min-h-screen flex flex-col">
          {/* Top bar */}
          <header className="container max-w-5xl pt-8 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {view !== "menu" ? (
                <button
                  onClick={() => setView("menu")}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  back to gift
                </button>
              ) : (
                <span className="font-hand text-2xl text-primary">for hajira ♥</span>
              )}
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              twenty
            </span>
          </header>

          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              {view === "menu" && (
                <motion.section
                  key="menu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="container max-w-5xl py-10"
                >
                  <div className="text-center mb-12">
                    <p className="font-hand text-3xl text-primary mb-2">happy birthday,</p>
                    <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
                      Hajira <span className="italic text-primary">·</span> 20
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                      pick a piece to open.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {cards.map((c, i) => (
                      <motion.button
                        key={c.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setView(c.id)}
                        className="paper-card p-8 text-left group"
                      >
                        <div className="text-4xl mb-5">{c.emoji}</div>
                        <h2 className="font-display text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">
                          {c.title}
                        </h2>
                        <p className="font-hand text-xl text-muted-foreground">
                          {c.subtitle}
                        </p>
                        <div className="mt-6 text-xs uppercase tracking-widest text-primary/70 flex items-center gap-2">
                          open
                          <span className="h-px w-6 bg-primary/40 group-hover:w-12 transition-all" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.section>
              )}

              {view === "memories" && (
                <motion.section
                  key="memories"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="container max-w-6xl py-10"
                >
                  <div className="mb-10">
                    <p className="font-hand text-2xl text-primary">📸 our memories</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold mt-1">
                      a little photo wall.
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-xl">
                      tap a frame to drop in a photo — bowling, prom, skating, whatever. make it yours.
                    </p>
                  </div>
                  <PhotoGallery />
                </motion.section>
              )}

              {view === "letter" && (
                <motion.section
                  key="letter"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="container max-w-3xl py-10"
                >
                  <div className="relative paper-card tape p-8 md:p-12">
                    <div className="absolute top-4 right-6 stamp rounded-full px-3 py-1 text-xs uppercase tracking-widest text-primary/70">
                      hajira · 20
                    </div>
                    <p className="font-hand text-3xl md:text-4xl text-primary mb-6">
                      hey hajira,
                    </p>
                    <div className="font-display text-lg md:text-xl leading-relaxed whitespace-pre-line text-foreground/90">
                      {LETTER}
                    </div>
                    <p className="font-hand text-3xl mt-8 text-foreground/80">
                      — always here.
                    </p>
                  </div>
                </motion.section>
              )}

              {view === "hopes" && (
                <motion.section
                  key="hopes"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="container max-w-4xl py-10"
                >
                  <div className="mb-10">
                    <p className="font-hand text-2xl text-primary">🤍 things i hope for you</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold mt-1">
                      small ones, real ones.
                    </h2>
                  </div>
                  <Wishes />
                </motion.section>
              )}

              {view === "game" && (
                <motion.section
                  key="game"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="container max-w-4xl py-10"
                >
                  <div className="mb-8">
                    <p className="font-hand text-2xl text-primary">🎂 a little birthday game</p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold mt-1">
                      try to catch the cake.
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-xl">
                      it might run. don't take it personally.
                    </p>
                  </div>
                  <CakeChase />
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <footer className="py-6 text-center text-xs text-muted-foreground">
            made just for you ♥
          </footer>
        </div>
      )}
    </main>
  );
};

export default Index;
