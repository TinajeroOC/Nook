'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { createCollectionRecord } from '@/actions/data'
import LabelledSwitch from '@/components/common/LabelledSwitch'
import { LinkValidation } from '@/lib/validations/link'

export default function CreateLink({ user, setLinks }) {
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
    resolver: yupResolver(LinkValidation),
  })

  const onSubmit = async () => {
    const { title, description, url, isVisible } = getValues()

    const record = await createCollectionRecord('links', {
      user: user.id,
      title,
      description,
      url,
      isVisible,
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
                  <LabelledSwitch
                    {...register('isVisible')}
                    label='Enable visibility'
                    description='Allow others to see this link'
                    defaultValue={false}
                    onValueChange={(isSelected) => setValue('isVisible', isSelected)}
                  />
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
