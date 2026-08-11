'use client';
import { weddingConfig } from '../../config/wedding';
import { v1Tw } from './v1Tw';

export default function CoupleNamesV1() {
  return (
    <div className={v1Tw.namesBlock}>
      <p className={v1Tw.nameBride}>{weddingConfig.bride}</p>
      <p className={v1Tw.nameAmp}>&</p>
      <p className={v1Tw.nameGroom}>{weddingConfig.groom}</p>
    </div>
  );
}
