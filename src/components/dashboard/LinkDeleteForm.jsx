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

import { deleteCollectionRecord } from '@/lib/actions/data'

export default function LinkDeleteForm({ recordId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = async () => {
    await deleteCollectionRecord({
      collectionName: 'links',
      recordId,
    })
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
              <ModalHeader className='flex flex-col gap-1'>Delete Link</ModalHeader>
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
