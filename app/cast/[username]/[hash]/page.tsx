import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';
import getCastHash from '@/lib/neynar/getCastHash';
import { supabaseClient } from '@/lib/supabase/client';
import Cast from '@/components/Cast';
import getUserByUsername from '@/lib/neynar/getNeynarUserByUsername';
import { getFullHash, getHighestRank } from '@/lib/utils';
import { stack } from '@/lib/stack/client';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: `${VERCEL_URL}/images/og.png`,
  },
  icons: [`${VERCEL_URL}/images/logo2.png`],
  other: {
    ...frameMetadata,
  },
};

async function getUserLeaderboardRanks(verifications: any[]) {
  const leaderboardRanks = await Promise.all(
    verifications.map(async (verification: any) => {
      const leaderboardData = await stack.getLeaderboardRank(verification);
      if (leaderboardData) {
        return leaderboardData.rank;
      }
    }),
  );
  return leaderboardRanks.filter((rank) => rank !== null && rank !== undefined);
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { username, hash } = params;

  try {
    const fullHash = await getFullHash(username, hash);
    const userProfile = await getUserByUsername(username);
    const verifications = userProfile?.verifications || [];
    const validRanks = await getUserLeaderboardRanks(verifications);
    const rank = getHighestRank(validRanks);

    let ogImageUrl = `/api/og-image/cast/${username}/${fullHash}/`;
    if (Number(rank) > 0) ogImageUrl = ogImageUrl + rank;
    return {
      title: TITLE,
      description: DESCRIPTION,
      openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        images: VERCEL_URL + ogImageUrl,
      },
      icons: [`${VERCEL_URL}/images/logo2.png`],
      other: {
        ...frameMetadata,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return metadata;
  }
}

export default async function CastHome({ params }: { params: { username: string; hash: string } }) {
  const { username, hash } = params;
  const fullHash = await getCastHash(`https://warpcast.com/${username}/${hash}`);

  const { data: cast } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('post_hash', fullHash)
    .single();

  return (
    <main className="container flex grow items-center justify-center">
      <Cast cast={cast} />
    </main>
  );
}
