import { Button, Link } from '@nextui-org/react'
import { IconArrowRight } from '@tabler/icons-react'

import SignUpForm from '@/components/forms/SignUp'

export default async function Page() {
  return (
    <div className='grid min-h-screen grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1'>
      <section className='flex flex-col items-center justify-center gap-4 px-16 py-8'>
        <h1 className='mb-2 text-2xl font-semibold sm:text-4xl'>Sign Up</h1>
        <div className='w-full max-w-sm'>
          <SignUpForm />
        </div>
        <footer>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <p>Already have an account?</p>
            <Button as={Link} color='default' href='login' variant='flat'>
              Log In
              <IconArrowRight size='20' />
            </Button>
          </div>
        </footer>
      </section>
      <section className='flex flex-col items-center justify-center bg-gradient-to-tl from-blue-700 to-blue-600 px-16 py-8 text-white'>
        <div className='flex max-w-lg flex-col items-start'>
          <a href='/' className='mb-4 text-3xl font-semibold sm:text-4xl'>
            Nook
          </a>
          <p className='mb-4 text-5xl font-semibold sm:text-6xl'>
            Everything about yourself, one link.
          </p>
          <p className='text-xl font-light'>
            Spread thin across the internet? Nook makes it easy with one convenient link. Create an
            account today to get started!
          </p>
        </div>
      </section>
    </div>
  )
}
