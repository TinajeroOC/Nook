'use client'

import { Button } from '@nextui-org/react'

import { deleteCollectionRecord } from '@/actions/record'

export function DeleteLinkForm({ link, setLinks, onClose }) {
  const onSubmit = async () => {
    const { id } = link

    setLinks((links) => links.filter((link) => link.id !== id))

    await deleteCollectionRecord('links', id)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <p>Are you sure you want to delete this link?</p>
      </div>
      <div className='flex justify-end gap-2 pb-2 pt-6'>
        <Button color='danger' variant='flat' onPress={onClose}>
          Cancel
        </Button>
        <Button color='primary' type='submit'>
          Delete
        </Button>
      </div>
    </form>
  )
}
