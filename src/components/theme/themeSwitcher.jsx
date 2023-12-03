'use client'

import { Switch } from '@nextui-org/react'
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Switch
      isSelected={theme === 'dark' ? true : false}
      color='primary'
      startContent={<IconSunFilled />}
      endContent={<IconMoonFilled />}
      onValueChange={(isSelected) => (isSelected ? setTheme('dark') : setTheme('light'))}
    ></Switch>
  )
}
