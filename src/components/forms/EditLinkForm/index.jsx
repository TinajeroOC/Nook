'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateCollectionRecord } from '@/actions/record'
import { LabelledSwitch } from '@/components/ui/LabelledSwitch'
import { LinkSchema } from '@/lib/validations/link'

export function EditLinkForm({ link, setLinks, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { defaultValues, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: link.title,
      description: link.description,
      url: link.url,
      isVisible: link.isVisible,
    },
    resolver: yupResolver(LinkSchema),
  })

  const onSubmit = async ({ title, description, url, isVisible }) => {
    console.log(title)
    const { id, user } = link

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('url', url)
    formData.append('isVisible', isVisible)

    const record = await updateCollectionRecord('links', id, formData)

    setLinks((links) =>
      links.map((link) =>
        link.id === id
          ? {
              collectionId: record.collectionId,
              id,
              user,
              title,
              description,
              url,
              isVisible,
            }
          : link
      )
    )
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      const { title, description, url, isVisible } = getValues()
      reset({
        title,
        description,
        url,
        isVisible,
      })
      onClose()
    }
  }, [getValues, isSubmitSuccessful, onClose, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <Input
          {...register('title')}
          label='Title'
          color={errors?.title ? 'danger' : 'default'}
          errorMessage={errors?.title?.message}
          defaultValue={defaultValues.title}
        />
        <Input
          {...register('description')}
          label='Description'
          color={errors?.description ? 'danger' : 'default'}
          errorMessage={errors?.description?.message}
          defaultValue={defaultValues.description}
        />
        <Input
          {...register('url')}
          label='URL'
          color={errors?.url ? 'danger' : 'default'}
          errorMessage={errors?.url?.message}
          defaultValue={defaultValues.url}
        />
        <LabelledSwitch
          {...register('isVisible')}
          label='Enable visibility'
          description='Allow others to see this link'
          defaultSelected={defaultValues.isVisible ? true : false}
          onValueChange={(isSelected) => setValue('isVisible', isSelected)}
        />
      </div>
      <div className='flex justify-end gap-2 pb-2 pt-4'>
        <Button color='danger' variant='flat' onPress={onClose}>
          Cancel
        </Button>
        <Button color='primary' type='submit'>
          Save
        </Button>
      </div>
    </form>
  )
}
