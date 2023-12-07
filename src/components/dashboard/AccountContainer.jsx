'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { IconAt, IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'

export default function AccountContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [username, setUsername] = useState(data.username)

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(16, 'Username must be shorter than 16 characters')
      .matches(/^[A-Za-z-0-9_]*$/, 'Username must only contain letters and numbers')
      .required('Enter your username'),
  })

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { username } = getValues()

    await updateCollectionRecord({
      collectionName: 'users',
      recordId: data.id,
      data: {
        username,
      },
    })

    setUsername(username)
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <h2 className='text-2xl'>Account</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-2'>
        <div className='flex flex-col'>
          <span>Username</span>
          <span className='text-sm font-light'>@{username}</span>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className='justify-end'>
        <Button onPress={onOpen} size='sm' color='primary' endContent={<IconEdit size='16' />}>
          Edit
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={clearErrors} backdrop='blur'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Editing Account</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Input
                      {...register('username')}
                      label='Username'
                      startContent={<IconAt size='20' />}
                      color={errors?.username ? 'danger' : 'default'}
                      errorMessage={errors?.username?.message}
                      description={
                        username && `People can view your nook at nook.com/${watch('username')}`
                      }
                      defaultValue={username}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color='primary'
                      type='submit'
                      onPress={() => {
                        isValid && onClose()
                      }}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  )
}
