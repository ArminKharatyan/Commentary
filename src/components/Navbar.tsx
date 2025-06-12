import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'
import Image from 'next/image'

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className='fixed top-0 inset-x-0 h-16 bg-zinc-100 border-b border-zinc-300 z-[50] px-4 flex items-center'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
        <div className="relative h-12 w-12">
          <Image
            src='/logo.png'
            alt='Logo'
            fill
            className='object-contain'
            sizes="(max-width: 768px) 40px, 48px"
          />
          </div>
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Commentary</p>
        </Link>

        <SearchBar />

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
