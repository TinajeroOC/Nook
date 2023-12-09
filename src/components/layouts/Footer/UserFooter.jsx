import { Divider, Link } from '@nextui-org/react'

export default function UserFooter() {
  return (
    <footer className='container mx-auto max-w-xl px-6 pb-6'>
      <div className='flex flex-col items-center justify-center gap-5'>
        <Divider />
        <Link href='/' color='foreground' className='font-light text-default-500'>
          Nook
        </Link>
      </div>
    </footer>
  )
}
