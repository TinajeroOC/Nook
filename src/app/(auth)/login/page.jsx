import { Button, Link } from '@nextui-org/react'
import { IconArrowRight } from '@tabler/icons-react'

import LogInForm from '@/components/forms/LogIn'

export default async function Page() {
  return (
    <div className='grid min-h-screen grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1'>
      <section className='flex flex-col items-center justify-center gap-4 px-16 py-8'>
        <h1 className='mb-2 text-2xl font-semibold sm:text-4xl'>Log In</h1>
        <div className='w-full max-w-sm'>
          <LogInForm />
        </div>
        <footer>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <p>Don&rsquo;t have an account?</p>
            <Button as={Link} color='default' href='signup' variant='flat'>
              Sign Up
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
          <p className='mb-4 text-5xl font-semibold sm:text-6xl'>Welcome back!</p>
          <p className='text-xl font-light'>Enter your login credentials to manage your nook.</p>
        </div>
      </section>
    </div>
  )
}
