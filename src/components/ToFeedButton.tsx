'use client'

import { ChevronLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './ui/Button'

const ToFeedButton = () => {
  const pathname = usePathname()

  const subboardPath = getSubboardPath(pathname)

  return (
    <a href={subboardPath} className={buttonVariants({ variant: 'ghost' })}>
      <ChevronLeft className='h-4 w-4 mr-1' />
      {subboardPath === '/' ? 'Back home' : 'Back to community'}
    </a>
  )
}

const getSubboardPath = (pathname: string) => {
  const splitPath = pathname.split('/').filter(Boolean)

  // Example: ['r', 'mycom'] => back to home
  if (splitPath.length === 2) return '/'
  
  // Example: ['r', 'mycom', 'post', 'someid'] => back to /r/mycom
  if (splitPath.length >= 3) return `/r/${encodeURIComponent(splitPath[1])}`

  // default fallback
  return '/'
}

export default ToFeedButton
