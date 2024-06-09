'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { createCollectionRecord } from '@/actions/record'
import { LabelledSwitch } from '@/components/ui/LabelledSwitch'
import { LinkSchema } from '@/lib/validations/link'

export function CreateLinkForm({ user, setLinks, onClose }) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      url: '',
      isVisible: false,
    },
    resolver: yupResolver(LinkSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      onClose()
    }
  }, [isSubmitSuccessful, onClose, reset])

  const onSubmit = async ({ title, description, url, isVisible }) => {
    const formData = new FormData()
    formData.append('user', user.id)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('url', url)
    formData.append('isVisible', isVisible)

    const record = await createCollectionRecord('links', formData)

    setLinks((links) => [
      ...links,
      {
        collectionId: record.collectionId,
        id: record.id,
        user: user.id,
        title,
        description,
        url,
        isVisible,
      },
    ])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <Input
          {...register('title')}
          label='Title'
          color={errors?.title ? 'danger' : 'default'}
          errorMessage={errors?.title?.message}
        />
        <Input
          {...register('description')}
          label='Description'
          color={errors?.description ? 'danger' : 'default'}
          errorMessage={errors?.description?.message}
        />
        <Input
          {...register('url')}
          label='URL'
          color={errors?.url ? 'danger' : 'default'}
          errorMessage={errors?.url?.message}
        />
        <LabelledSwitch
          {...register('isVisible')}
          label='Enable visibility'
          description='Allow others to see this link.'
          defaultValue={false}
          onValueChange={(isSelected) => setValue('isVisible', isSelected)}
        />
      </div>
      <div className='flex justify-end gap-2 pb-2 pt-4'>
        <Button color='danger' variant='flat' onPress={onClose}>
          Cancel
        </Button>
        <Button color='primary' type='submit'>
          Create
        </Button>
      </div>
    </form>
  )
}
