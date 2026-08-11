import { weddingConfig } from '../../config/wedding';

/** Editorial date row: AUG • 30 • 2026 */
export const eventDateParts = {
  month: weddingConfig.weddingDate
    .toLocaleString('en-US', { month: 'short', timeZone: 'Asia/Kolkata' })
    .toUpperCase(),
  day: weddingConfig.weddingDate.toLocaleString('en-US', {
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  }),
  year: weddingConfig.weddingDate.toLocaleString('en-US', {
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }),
  timePhrase: 'at twelve o\'clock pm',
} as const;
