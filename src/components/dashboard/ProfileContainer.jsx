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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'

export default function ProfileContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [name, setName] = useState(data.name)
  const [about, setAbout] = useState('')

  const schema = Yup.object().shape({
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
      name,
      about,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { name, about } = getValues()

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
        about,
      },
    })

    setName(name)
    setAbout(about)
  }

  const SettingField = ({ label, value }) => (
    <div className='flex flex-col'>
      <span>{label}</span>
      <span className='text-sm font-light'>{value ? value : 'None'}</span>
    </div>
  )

  return (
    <Card className='mb-8'>
      <CardHeader className='flex flex-row items-center justify-between gap-2'>
        <h2 className='text-2xl'>Profile</h2>
        <Button onPress={onOpen} size='sm' color='default' variant='flat'>
          Edit
        </Button>
      </CardHeader>
      <CardBody className='gap-2'>
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
