'use client'

import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { IconExternalLink } from '@tabler/icons-react'

import CopyText from '../common/CopyText'
import { useUsernameContext } from './UsernameContext'

export default function RedirectContainer() {
  const { username } = useUsernameContext()

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
        <CopyText
          label='Copy Link'
          placement='bottom-end'
          value={`/${username}`}
          isSiteUrl={true}
        />
      </CardBody>
    </Card>
  )
}
