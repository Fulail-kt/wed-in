import { Redis } from '@upstash/redis';
import { envGet } from './env';

let client: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = envGet('UPSTASH_REDIS_REST_URL');
  const token = envGet('UPSTASH_REDIS_REST_TOKEN');
  if (!url || !token || url.includes('your-db')) {
    client = null;
    return null;
  }

  client = new Redis({ url, token });
  return client;
}
