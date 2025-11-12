"use client";

import { usePathname } from 'next/navigation';
import ServerLeftBar from './ServerLeftBar';
import RightBar from './RightBar';

interface AppShellProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function AppShell({ children, modal }: AppShellProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // PE PAGINILE DE AUTH → NU RANDA BARELE, NU MAX-W-7XL
  if (isAuthPage) {
    return (
      <>
        {children}
        {modal}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:block">
          <ServerLeftBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 border-x border-borderGray max-w-xl lg:max-w-2xl">
          {children}
          {modal}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block">
          <RightBar />
        </aside>
      </div>
    </div>
  );
}