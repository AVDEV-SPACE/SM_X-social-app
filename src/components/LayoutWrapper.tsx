'use client'
import { usePathname } from 'next/navigation'
import MainLayout from './MainLayout'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>
  }

  return <MainLayout>{children}</MainLayout>
}