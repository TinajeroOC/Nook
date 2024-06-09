'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'

import { CreateLinkForm } from '@/components/forms/CreateLinkForm'

export function CreateLinkModal({ user, setLinks }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} color='default' variant='flat' endContent={<IconPlus size='16' />}>
        Create Link
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Link</ModalHeader>
              <ModalBody>
                <CreateLinkForm user={user} setLinks={setLinks} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
