import { Button, commonColors, Link } from '@nextui-org/react'
import { IconArrowRight } from '@tabler/icons-react'

export function UsernameFooter() {
  return (
    <footer className='mx-auto max-w-xl px-6 pb-6'>
      <div className='flex flex-row justify-center gap-2'>
        <Link href='/' color='foreground' className='font-light text-default-500'>
          Nook
        </Link>
        <Button
          as={Link}
          href='/signup'
          size='sm'
          variant='flat'
          endContent={<IconArrowRight size='16' color={commonColors['zinc'][400]} />}
        >
          <p className='text-default-500'>New? Get Started</p>
        </Button>
      </div>
    </footer>
  )
}
