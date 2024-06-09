'use client'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { IconEdit } from '@tabler/icons-react'

import { EditLinkForm } from '@/components/forms/EditLinkForm'

export function EditLinkModal({ link, setLinks }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Tooltip content='Edit Link'>
        <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
          <IconEdit onClick={onOpen} size='20' />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Link</ModalHeader>
              <ModalBody>
                <EditLinkForm link={link} setLinks={setLinks} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
