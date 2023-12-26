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
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateCollectionRecord } from '@/actions/data'
import { LinkValidation } from '@/lib/validations/link'

export default function EditLink({ link, setLinks }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
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
    resolver: yupResolver(LinkValidation),
  })

  const onSubmit = async () => {
    const { title, description, url, isVisible } = getValues()
    const { id, user } = link

    await updateCollectionRecord({
      collectionName: 'links',
      recordId: id,
      data: {
        title,
        description,
        url,
        isVisible,
      },
    })

    setLinks((links) =>
      links.map((link) =>
        link.id === id ? { id, user, title, description, url, isVisible } : link
      )
    )
  }

  useEffect(() => {
    const { title, description, url, isVisible } = getValues()

    reset({
      title,
      description,
      url,
      isVisible,
    })

    onClose()
  }, [isSubmitSuccessful])

  return (
    <>
      <Tooltip content='Edit Link'>
        <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
          <IconEdit onClick={onOpen} size='20' />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Link</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
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
                  <Switch
                    {...register('isVisible')}
                    defaultSelected={defaultValues.isVisible ? true : false}
                    onValueChange={(isSelected) => setValue('isVisible', isSelected)}
                    classNames={{
                      base: cn(
                        'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                        'justify-between cursor-pointer rounded-xl gap-8 pl-3 py-2 border-2 border-transparent'
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
                      <p className='text-sm text-default-500'>Enable visibility</p>
                      <p className='text-xs'>Allow others to see this link.</p>
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
