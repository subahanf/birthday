import { useState } from "react";
import { motion } from "framer-motion";
import { GiftUnwrap } from "@/components/GiftUnwrap";
import { PhotoGallery } from "@/components/PhotoGallery";
import { AdventureMap } from "@/components/AdventureMap";
import { Wishes } from "@/components/Wishes";
import { FuturePlans } from "@/components/FuturePlans";
import mountainHero from "@/assets/mountain-hero.jpg";

const RECIPIENT = "Hajira";
const LETTER = `Happy Birthday Hajira!!! It's crazy how time actually flies by so quickly. It's already been almost more than a year since you went back. But I am super happy for you that you are doing great in uni and are attending one of the best uni's there.

You will do great in the future, I have no doubt about it. Don't let anyone or anything get to you, especially the "lads" there 😂.

I am always here if you ever need anything. Call or msg anytime.

Happy 20th birthday Hajira ♥ — enjoy your day and enjoy your official non-teen years.`;

const Section = ({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="container max-w-6xl py-20 md:py-28">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-hand text-3xl text-primary">{index}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
        {title}
      </h2>
    </motion.div>
    {children}
  </section>
);

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen">
      {!opened && <GiftUnwrap recipientName={RECIPIENT} onOpen={() => setOpened(true)} />}

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src={mountainHero}
          alt="Mountains at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={opened ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="container max-w-6xl relative z-10 pb-20 md:pb-32"
        >
          <p className="font-hand text-3xl md:text-4xl text-primary mb-3 animate-wiggle inline-block">
            ✦ chapter zero ✦
          </p>
          <h1 className="font-display text-6xl md:text-9xl font-bold leading-[0.9] mb-6">
            Happy 20th,
            <br />
            <span className="italic text-primary">Hajira</span>.
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-foreground/80 leading-relaxed">
            an unwrappable little gift — built from memories, mountains we've
            climbed (and some we haven't yet), and a long list of wishes for
            the year ahead.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            <span>scroll to keep unwrapping</span>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 1 — GALLERY */}
      <div className="bg-paper border-y border-border/50">
        <Section index="01" kicker="memory roll" title="moments worth keeping.">
          <p className="font-display text-lg text-muted-foreground italic mb-10 max-w-2xl">
            tap any frame to drop in a photo — make it yours.
          </p>
          <PhotoGallery />
        </Section>
      </div>

      {/* CHAPTER 2 — MAP */}
      <Section index="02" kicker="the map" title="places we've been.">
        <p className="font-display text-lg text-muted-foreground italic mb-10 max-w-2xl">
          a little cartography of our adventures. hover the pins.
        </p>
        <AdventureMap />
      </Section>

      {/* CHAPTER 3 — LETTER */}
      <div className="bg-paper border-y border-border/50">
        <Section index="03" kicker="from me, to you" title="a proper note.">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
            viewport={{ once: true }}
            className="relative paper-card tape p-8 md:p-14 max-w-3xl mx-auto"
          >
            <div className="absolute top-4 right-6 stamp rounded-full px-3 py-1 text-xs uppercase tracking-widest text-primary/70">
              for hajira · 20
            </div>
            <p className="font-hand text-3xl md:text-4xl text-primary mb-6">
              dear hajira,
            </p>
            <div className="font-display text-lg md:text-xl leading-relaxed whitespace-pre-line text-foreground/90">
              {LETTER}
            </div>
            <p className="font-hand text-3xl mt-8 text-foreground/80">— always rooting for you.</p>
          </motion.div>
        </Section>
      </div>

      {/* CHAPTER 4 — WISHES */}
      <Section index="04" kicker="six wishes" title="for the year ahead.">
        <Wishes />
      </Section>

      {/* CHAPTER 5 — FUTURE */}
      <div className="bg-paper border-y border-border/50">
        <Section index="05" kicker="the to-adventure list" title="things we still owe each other.">
          <p className="font-display text-lg text-muted-foreground italic mb-10 max-w-2xl">
            consider these IOUs. the wild is calling.
          </p>
          <FuturePlans />
        </Section>
      </div>

      {/* OUTRO */}
      <section className="container max-w-3xl py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-hand text-4xl text-primary mb-4">that's the whole gift ✦</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6 leading-tight">
            here's to twenty,
            <br />
            and every adventure after.
          </h2>
          <p className="text-muted-foreground">
            with love — made just for you.
          </p>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border/50">
        crafted with care · for hajira's 20th
      </footer>
    </main>
  );
};

export default Index;
