'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export default function Footer() {
  return (
    <footer className="section-shell border-t border-[#E8E2D8]/70">
      <div className="section-inner max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5 w-full"
        >
        

          <h2 className="font-serif-title text-4xl md:text-5xl text-[#2A2523] font-normal tracking-tight">
            <span className="couple-names">
              <span className="couple-names__part whitespace-nowrap">{weddingConfig.groom}</span>
              <span className="couple-names__amp font-serif-body italic">&amp;</span>
              <span className="couple-names__part whitespace-nowrap">{weddingConfig.bride}</span>
            </span>
          </h2>

          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8A827B] font-medium">
            {weddingConfig.weddingDateDisplay}
          </p>

          <p className="font-serif-body text-xl md:text-2xl italic text-[#8A827B] mt-1">
            "Two souls, one heart, forever insha Allah."
          </p>

          <div className="w-12 h-px bg-[#E8E2D8] my-3" />

          <div className="flex items-center justify-center gap-1.5 text-[#8A827B] text-xs">
            <span>Made with</span>
            <Heart size={11} className="text-[#9E5A64]" fill="currentColor" />
            <span>for the happiest day</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
