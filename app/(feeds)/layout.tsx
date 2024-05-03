'use client';
import PlatformFilter from '@/components/Feed/PlatformFilter';
import { ReactNode } from 'react';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import { Separator } from '@/components/ui/separator';
import BalanceInfo from '@/components/BalanceInfo';
import ChannelFilter from '@/components/Feed/ChannelFilter';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="container flex justify-center font-helvetica bg-blend-color-burn md:gap-6">
        <div className="flex flex-col gap-8 max-md:hidden">
          <h2 className="text-2xl font-bold">Notes</h2>
          <BalanceInfo />
          <Separator className="mt-10" />
          <ChannelFilter />
        </div>
        <Separator orientation="vertical" className="max-md:hidden" />

        <div className="flex max-w-full grow flex-col items-center gap-4">
          <Tabs tabs={tabs} className="max-md:hidden" />
          <div className="w-full grow overflow-hidden">{children}</div>
        </div>
        <Separator orientation="vertical" className="max-md:hidden" />
        <div className="min-w-48 pt-16 max-md:hidden">
          <PlatformFilter />
        </div>
      </div>
    </main>
  );
}
