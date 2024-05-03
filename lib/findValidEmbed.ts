import { FeedFilter } from '@/types/Feed';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import isValidUrl from './isValidUrl';
import { SupabasePost } from '@/types/SupabasePost';

export default function findValidEmbed(cast: SupabasePost, filter: FeedFilter = {}) {
  const embeds = cast.embeds.map((embed) => JSON.parse(embed));
  const validEmbed = embeds.find((embed) => {
    if (!('url' in embed)) return false;
    const url = embed.url;
    const isValid = isValidUrl(url);
    if (filter?.platform && !url.includes(filter.platform)) {
      return false;
    }
    return isValid;
  });

  return validEmbed as EmbedUrl;
}
