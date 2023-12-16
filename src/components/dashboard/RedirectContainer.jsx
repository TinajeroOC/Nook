import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { IconExternalLink } from '@tabler/icons-react'

import CopyText from '../common/CopyText'

export default function RedirectContainer({ data }) {
  return (
    <Card>
      <CardBody className='flex w-full flex-row gap-2'>
        <Button
          as={Link}
          isExternal={true}
          href={`/${data}`}
          color='primary'
          endContent={<IconExternalLink size='20' />}
          className='w-full'
        >
          View Nook
        </Button>
        <CopyText label='Copy Link' placement='bottom-end' value={`/${data}`} isSiteUrl={true} />
      </CardBody>
    </Card>
  )
}
