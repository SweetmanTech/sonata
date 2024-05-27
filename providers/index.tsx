'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyControllerProvider } from './SpotifyControllerProvider';
import { SoundcloudWidgetProvider } from './SoundcloudWidgetProvider';
import PlayerProvider from './PlayerProvider';
import SupabaseProvider from './SupabaseProvider';
import TipProvider from './TipProvider';
import FeedProvider from './FeedProvider';
import { SoundContextProvider } from './SoundContextProvider';
import UiProvider from './UiProvider';
import { YouTubePlayerProvider } from './YoutubeControllerProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <TipProvider>
          <UiProvider>
            <SpotifyControllerProvider>
              <SoundcloudWidgetProvider>
                <SoundContextProvider>
                  <YouTubePlayerProvider>
                    <PlayerProvider>
                      <FeedProvider>{children}</FeedProvider>
                    </PlayerProvider>
                  </YouTubePlayerProvider>
                </SoundContextProvider>
              </SoundcloudWidgetProvider>
            </SpotifyControllerProvider>
          </UiProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
