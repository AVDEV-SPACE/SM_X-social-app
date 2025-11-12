import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from '@/providers/QueryProvider';
import AppShell from '@/components/AppShell';
import './globals.css';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <QueryProvider>
            <AppShell modal={modal}>{children}</AppShell>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}