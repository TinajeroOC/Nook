'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { IconCopy } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export default function CopyText({ label, placement, value, isSiteUrl }) {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <Tooltip content={label} placement={placement}>
      <Button
        isIconOnly
        color='default'
        onClick={() => {
          isSiteUrl
            ? navigator.clipboard.writeText(`${origin}${value}`)
            : navigator.clipboard.writeText(value)
        }}
      >
        <IconCopy size='20' />
      </Button>
    </Tooltip>
  )
}
