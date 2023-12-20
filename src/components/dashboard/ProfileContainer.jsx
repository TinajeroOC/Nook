'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { IconAt } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'

import { useUsernameContext } from './UsernameContext'

export default function ProfileContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { username, setUsername } = useUsernameContext()
  const [name, setName] = useState(data.user.name)
  const [about, setAbout] = useState(data.settings.about)

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(16, 'Username must be shorter than 16 characters')
      .matches(/^[A-Za-z-0-9_]*$/, 'Username must only contain letters and numbers')
      .required('Enter your username'),
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(32, 'Name must be shorter than 32 characters')
      .matches(/^[A-Za-z\s]+$/, 'Name must only contain letters')
      .required('Enter your name'),
    about: Yup.string().max(128, 'About must be shorter than 128 characters'),
  })

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username,
      name,
      about,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { username, name, about } = getValues()

    await updateCollectionRecord({
      collectionName: 'users',
      recordId: data.user.id,
      data: {
        username,
        name,
      },
    })
    await updateCollectionRecord({
      collectionName: 'settings',
      recordId: data.settings.id,
      data: {
        about,
      },
    })

    setUsername(username)
    setName(name)
    setAbout(about)
  }

  const SettingField = ({ label, value }) => (
    <div className='flex flex-col'>
      <span>{label}</span>
      <span className='text-sm text-default-500'>{value ? value : 'None'}</span>
    </div>
  )

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between gap-2'>
        <h2 className='text-2xl'>Profile</h2>
        <Button onPress={onOpen} size='sm' color='default' variant='flat'>
          Edit
        </Button>
      </CardHeader>
      <CardBody className='gap-2'>
        <SettingField label='Username' value={`@${username}`} />
        <SettingField label='Name' value={name} />
        <SettingField label='About' value={about} />
      </CardBody>
      <CardFooter className='justify-end'>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={clearErrors} backdrop='blur'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Editing Profile</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Input
                      {...register('username')}
                      label='Username'
                      startContent={<IconAt size='20' />}
                      color={errors?.username ? 'danger' : 'default'}
                      errorMessage={errors?.username?.message}
                      defaultValue={username}
                    />
                    <Input
                      {...register('name')}
                      label='Name'
                      color={errors?.name ? 'danger' : 'default'}
                      errorMessage={errors?.name?.message}
                      defaultValue={name}
                    />
                    <Input
                      {...register('about')}
                      label='About'
                      color={errors?.about ? 'danger' : 'default'}
                      errorMessage={errors?.about?.message}
                      defaultValue={about}
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
