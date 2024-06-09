'use client'

import { Button, Card, CardBody, Link, Tooltip } from '@nextui-org/react'
import { IconCopy, IconExternalLink } from '@tabler/icons-react'

import { useClipboard } from '@/hooks/useClipboard'
import { getHostUrl } from '@/lib/utils'
import { useUsernameContext } from '@/providers/UsernameProvider'

export function RedirectCard() {
  const { username } = useUsernameContext()
  const { onCopy, isCopied } = useClipboard(`${getHostUrl()}${username}`)

  return (
    <Card>
      <CardBody className='flex w-full flex-row gap-2'>
        <Button
          as={Link}
          isExternal={true}
          href={`/${username}`}
          color='primary'
          endContent={<IconExternalLink size='20' />}
          className='w-full'
        >
          View Nook
        </Button>
        <Tooltip content={isCopied ? 'Copied' : 'Copy Link'} placement='bottom-end'>
          <Button
            isIconOnly
            variant='flat'
            onPress={onCopy}
            color={isCopied ? 'success' : 'default'}
          >
            <IconCopy />
          </Button>
        </Tooltip>
      </CardBody>
    </Card>
  )
}
