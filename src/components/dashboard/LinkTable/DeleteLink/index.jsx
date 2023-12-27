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

import { deleteCollectionRecord } from '@/actions/data'

export default function DeleteLink({ link, setLinks }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = async () => {
    const { id } = link

    setLinks((links) => links.filter((link) => link.id !== id))

    await deleteCollectionRecord('links', id)
  }

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
              <form onSubmit={onSubmit}>
                <ModalBody>
                  <p>Are you sure you want to delete this link?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color='default' variant='flat' onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color='danger' type='submit' onPress={onClose}>
                    Delete
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
