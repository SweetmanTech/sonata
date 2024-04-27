'use client';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { metadata, position } = player;

  if (!metadata) return <></>;

  const handlePlay = () => {
    dispatch({ type: 'RESUME' });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  return (
    <div
      data-type={metadata.type}
      className="fixed bottom-0 left-0 w-full p-2 bg-black flex flex-col gap-4"
    >
      <div className="flex gap-4">
        <div className="w-16 aspect-square shadow-md flex-shrink-0 my-auto relative">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-lg"
            unoptimized
          />
        </div>

        <div className="grow flex flex-col gap-1 text-left pt-2">
          <div className="text-sm font-bold text-white font-inter line-clamp-2">
            {metadata.trackName}
          </div>
          <div className="text-xs font-extralight text-white font-inter line-clamp-2">
            {metadata.artistName}
          </div>
        </div>
        <div className="my-auto">
          {player.playing ? (
            <button onClick={handlePause}>
              <MdPauseCircle className="text-white text-4xl" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <MdPlayCircle className="text-white text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-white text-xs font-light font-inter">
          <span>{formatDuration(position)}</span>
          <span>{formatDuration(metadata.duration)}</span>
        </div>
        <div className="bg-gray-600 w-full h-1 rounded-lg overflow-hidden">
          <div
            className="bg-white h-1 rounded-lg"
            style={{ width: `${(position / metadata.duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
