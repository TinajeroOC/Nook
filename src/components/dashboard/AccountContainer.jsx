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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'
import useHost from '@/lib/hooks/useHost'

export default function AccountContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const host = useHost()
  const router = useRouter()

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
      username: data.username,
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

    router.refresh()
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
        <h2 className='text-2xl'>Account</h2>
        <Button onPress={onOpen} size='sm' color='default' variant='flat'>
          Edit
        </Button>
      </CardHeader>
      <CardBody className='gap-2'>
        <SettingField label='Username' value={`@${data.username}`} />
      </CardBody>
      <CardFooter className='justify-end'>
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
                      defaultValue={data.username}
                      startContent={<IconAt size='20' />}
                      color={errors?.username ? 'danger' : 'default'}
                      errorMessage={errors?.username?.message}
                      description={
                        watch('username') &&
                        `People can view your nook at ${host}/${getValues(
                          'username'
                        ).toLowerCase()}`
                      }
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
