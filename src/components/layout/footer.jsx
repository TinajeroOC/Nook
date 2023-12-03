import { Divider } from '@nextui-org/react'

export default function Footer() {
  return (
    <>
      <Divider />
      <footer className='flex w-full flex-col items-center p-6'>
        <p className='font-light text-default-500'>
          Copyright © 2023 - All rights reserved by Nook
        </p>
      </footer>
    </>
  )
}
