'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  cn,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { createCollectionRecord } from '@/lib/actions/data'

const schema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Title must be at least 1 character')
    .max(16, 'Title must be shorter than 16 characters')
    .required('Enter your title'),
  description: Yup.string().max(64, 'Description must be shorter than 64 characters'),
  url: Yup.string().url('Enter a valid url').required('Enter your url'),
  isVisible: Yup.boolean(),
})

export default function LinkCreateForm({ user, setLinks }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
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
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { title, description, url, isVisible } = getValues()

    const record = await createCollectionRecord({
      collectionName: 'links',
      data: {
        user: user.id,
        title,
        description,
        url,
        isVisible,
      },
    })

    setLinks((links) => [
      ...links,
      { id: record.id, user: user.id, title, description, url, isVisible },
    ])
  }

  useEffect(() => {
    reset()
    onClose()
  }, [isSubmitSuccessful])

  return (
    <>
      <Button
        onPress={onOpen}
        color='default'
        size='sm'
        variant='flat'
        endContent={<IconPlus size='20' />}
      >
        Create Link
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Link</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
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
                  <Switch
                    {...register('isVisible')}
                    defaultValue={false}
                    onValueChange={(isSelected) => setValue('isVisible', isSelected)}
                    classNames={{
                      base: cn(
                        'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                        'justify-between cursor-pointer rounded-lg gap-8 p-1 border-2 border-transparent'
                      ),
                      wrapper: 'p-0 h-4 overflow-visible',
                      thumb: cn(
                        'w-6 h-6 border-2 shadow-lg',
                        'group-data-[selected=true]:ml-6',
                        'group-data-[pressed=true]:w-7',
                        'group-data-[selected]:group-data-[pressed]:ml-4'
                      ),
                    }}
                  >
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>Enable visibility</p>
                      <p className='text-xs text-default-400'>Allow others to see this link.</p>
                    </div>
                  </Switch>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='flat' onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color='primary' type='submit'>
                    Save
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
