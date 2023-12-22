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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'

import SettingField from './SettingField'
import { useUsernameContext } from './UsernameContext'

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

export default function ProfileContainer({ data }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { username, setUsername } = useUsernameContext()
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { defaultValues, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username,
      name: data.user.name,
      about: data.settings.about,
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
  }

  useEffect(() => {
    const { username, name, about } = getValues()

    reset({
      username,
      name,
      about,
    })

    onClose()
  }, [isSubmitSuccessful])

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
        <SettingField label='Name' value={defaultValues.name} />
        <SettingField label='About' value={defaultValues.about} />
      </CardBody>
      <CardFooter>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset} backdrop='blur'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Profile</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Input
                      {...register('username')}
                      label='Username'
                      startContent={<IconAt size='20' />}
                      color={errors?.username ? 'danger' : 'default'}
                      errorMessage={errors?.username?.message}
                      defaultValue={defaultValues.username}
                    />
                    <Input
                      {...register('name')}
                      label='Name'
                      color={errors?.name ? 'danger' : 'default'}
                      errorMessage={errors?.name?.message}
                      defaultValue={defaultValues.name}
                    />
                    <Input
                      {...register('about')}
                      label='About'
                      color={errors?.about ? 'danger' : 'default'}
                      errorMessage={errors?.about?.message}
                      defaultValue={defaultValues.about}
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
      </CardFooter>
    </Card>
  )
}
