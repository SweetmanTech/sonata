import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import getCastLikes from '@/lib/neynar/getCastLikes';
import { SupabasePost } from '@/types/SupabasePost';
import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useUi } from '@/providers/UiProvider';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function Like({ cast }: { cast: SupabasePost }) {
  const { signer, user } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState(false);
  const [votes, setVotes] = useState<number>(cast.likes || 0);
  const { checkLoggedIn } = useUi();
  const { tip } = useTipProvider();
  const userFid = user?.fid;
  const castAuthorFid = cast.author?.fid;
  const isSelfPost = userFid === castAuthorFid;

  useEffect(() => {
    const updateReaction = async () => {
      const likes = await getCastLikes(cast.post_hash);
      if ('error' in likes) {
        return;
      }
      if (likes.some((like: any) => like.fid === signer?.fid)) {
        setUpvoted(true);
      }
    };
    if (signer?.fid && cast.post_hash) {
      updateReaction();
    }
  }, [cast.post_hash, signer?.fid]);

  const handleClick = async () => {
    if (!checkLoggedIn()) return;
    const currentVotes = votes;
    setUpvoted(true);
    setVotes(votes + 1);

    const { signer_uuid } = signer as Signer;
    const response = await createReaction(signer_uuid, cast.post_hash);

    if (response.success) {
      if (isSelfPost) return;
      const data = await tip(10, cast.post_hash, cast.author.verifications);
      if (!data) {
        setUpvoted(false);
        setVotes(currentVotes);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'h-auto rounded-full bg-muted px-4 py-1 font-semibold space-x-1 text-base',
        upvoted && 'bg-red-50 text-red-600 hover:text-red-600 hover:bg-red-50',
      )}
    >
      {upvoted ? <FaHeart /> : <FaRegHeart />}
      <span className="leading-none">{votes}</span>
    </Button>
  );
}