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

import { updateCollectionRecord } from '@/actions/data'
import SettingField from '@/components/dashboard/SettingField'
import { useUsernameContext } from '@/contexts/UsernameContext'
import { ProfileValidation } from '@/lib/validations/settings'

export default function ProfileCard({ data }) {
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
    resolver: yupResolver(ProfileValidation),
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
