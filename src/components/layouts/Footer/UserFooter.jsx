import { Divider, Link } from '@nextui-org/react'

export default function UserFooter() {
  return (
    <footer className='container mx-auto max-w-xl px-8 pb-8'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <Divider />
        <Link href='/' color='foreground' className='text-xl font-semibold'>
          Nook
        </Link>
      </div>
    </footer>
  )
}
