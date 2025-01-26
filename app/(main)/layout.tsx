import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';

import { DisableDraftMode } from '@/components/disable-draft-mode';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { SanityLive } from '@/sanity/lib/live';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
