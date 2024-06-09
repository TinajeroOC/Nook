'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

export function Toaster({ ...props }) {
  const theme = useTheme()

  return (
    <Sonner
      theme={theme}
      position='top-center'
      className='toaster group'
      gap={8}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-content1 hover:bg-content2 w-full max-w-sm p-4 rounded-xl border-transparent shadow-md flex flex-row items-center gap-2',
          title: 'text-md',
          description: 'text-sm',
          error: 'bg-danger-200 hover:bg-danger-300',
          success: 'bg-success-200 hover:bg-success-300',
          warning: 'bg-warning-200 hover:bg-warning-300',
        },
      }}
      {...props}
    />
  )
}
