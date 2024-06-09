import { Divider } from '@nextui-org/react'

export function MarketingFooter() {
  return (
    <>
      <Divider />
      <footer className='mx-auto max-w-xl p-6'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-center font-light text-default-500'>
            Copyright © 2023 - All rights reserved by Nook
          </p>
        </div>
      </footer>
    </>
  )
}
