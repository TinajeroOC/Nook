'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'

import { deleteCollectionRecord } from '@/actions/record'
import { DeleteLinkForm } from '@/components/forms/DeleteLinkForm'

export function DeleteLinkModal({ link, setLinks }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Tooltip content='Delete Link'>
        <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
          <IconTrash onClick={onOpen} size='20' />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Link</ModalHeader>
              <ModalBody>
                <DeleteLinkForm link={link} setLinks={setLinks} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
