'use client';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import { v1Tw } from './v1Tw';

export default function FooterV1() {
  return (
    <motion.footer
      className={v1Tw.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={`${v1Tw.rule} mx-auto`} aria-hidden="true" />
      <p className={`${v1Tw.footerNames} mt-4`}>
        <span className={v1Tw.footerNameA}>{weddingConfig.bride}</span>
        <span className={v1Tw.footerAmp}>&</span>
        <span className={v1Tw.footerNameB}>{weddingConfig.groom}</span>
      </p>
      <p className={`${v1Tw.footerDate} mt-1`}>August 30, 2026</p>
    </motion.footer>
  );
}
