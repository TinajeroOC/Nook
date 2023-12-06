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
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'

export default function ProfileContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [name, setName] = useState(data.name)
  const [bio, setBio] = useState(data.bio)
  const [status, setStatus] = useState(data.status)

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(32, 'Name must be shorter than 32 characters')
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters')
      .required('Enter your name'),
    bio: Yup.string().max(128, 'Bio must be shorter than 128 characters'),
    status: Yup.string().max(16, 'Status must be shorter than 16 characters'),
  })

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name,
      bio,
      status,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { name, bio, status } = getValues()

    await updateCollectionRecord({
      collectionName: 'users',
      recordId: data.user,
      data: {
        name,
      },
    })
    await updateCollectionRecord({
      collectionName: 'settings',
      recordId: data.id,
      data: {
        bio,
        status,
      },
    })

    setName(name)
    setBio(bio)
    setStatus(status)
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <h2 className='text-2xl'>Profile</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-2'>
        <div className='flex flex-col'>
          <span>Name</span>
          <span className='text-sm font-light'>{name}</span>
        </div>
        <div className='flex flex-col'>
          <span>Bio</span>
          <span className='text-sm font-light'>{bio ? bio : 'None'}</span>
        </div>
        <div className='flex flex-col'>
          <span>Status</span>
          <span className='text-sm font-light'>{status ? status : 'None'}</span>
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
                <ModalHeader className='flex flex-col gap-1'>Editing Profile</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Input
                      {...register('name')}
                      label='Name'
                      color={errors?.name ? 'danger' : 'default'}
                      errorMessage={errors?.name?.message}
                      defaultValue={name}
                    />
                    <Input
                      {...register('bio')}
                      label='Bio'
                      color={errors?.bio ? 'danger' : 'default'}
                      errorMessage={errors?.bio?.message}
                      defaultValue={bio}
                    />
                    <Input
                      {...register('status')}
                      label='Status'
                      color={errors?.status ? 'danger' : 'default'}
                      errorMessage={errors?.status?.message}
                      defaultValue={status}
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
