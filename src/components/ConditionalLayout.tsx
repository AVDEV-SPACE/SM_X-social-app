import { usePathname } from 'next/navigation'
import LeftBar from './LeftBar'
import RightBar from './RightBar'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
      <div className="px-2 xsm:px-4 xxl:px-8">
        <LeftBar />
      </div>
      <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray">
        {children}
      </div>
      <div className="hidden lg:flex ml-4 md:ml-8 flex-1">
        <RightBar />
      </div>
    </div>
  )
}