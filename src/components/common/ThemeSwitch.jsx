'use client'

import { useSwitch, VisuallyHidden } from '@nextui-org/react'
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const StyledSwitch = (props) => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props)

  return (
    <>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'h-10 w-10',
              'flex items-center justify-center',
              'rounded-xl bg-default-50 hover:bg-default-100',
              'mr-0',
            ],
          })}
        >
          {isSelected ? <IconSunFilled size='20' /> : <IconMoonFilled size='20' />}
        </div>
      </Component>
    </>
  )
}

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <StyledSwitch
      isSelected={theme === 'dark' ? false : true}
      onValueChange={(isSelected) => (isSelected ? setTheme('light') : setTheme('dark'))}
    />
  )
}
