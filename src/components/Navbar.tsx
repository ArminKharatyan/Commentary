import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className='fixed top-0 inset-x-0 h-16 bg-zinc-100 border-b border-zinc-300 z-[50] px-4 flex items-center'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <img
            src='/logo.png'
            alt='Logo'
            className='h-12 w-12 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain'
          />
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Commentary</p>
        </Link>

        {/* search bar */}
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
