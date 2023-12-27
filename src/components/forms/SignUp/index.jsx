'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { IconAt, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import useSignUp from '@/hooks/useSignUp'
import { getHostUrl } from '@/lib/utils'
import { UserValidation } from '@/lib/validations/user'

export default function SignUpForm() {
  const router = useRouter()
  const { onSignUp, isLoading, user, error } = useSignUp()
  const [isPassVisible, setIsPassVisible] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(UserValidation),
  })

  useEffect(() => {
    if (error) {
      toast.error('Unable to sign up', {
        description: 'Confirm that your username or email are not already taken.',
      })
    } else if (user) {
      toast.dismiss()
      router.push('/login')
    }
  }, [error, user, setError, router])

  const onSubmit = async () => {
    const { username, name, email, password } = getValues()
    await onSignUp(username, name, email, password)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        {...register('username')}
        isRequired
        label='Username'
        startContent={<IconAt size='20' />}
        color={errors?.username ? 'danger' : 'default'}
        errorMessage={errors?.username?.message}
        description={
          watch('username') &&
          `People can view your nook at ${getHostUrl()}${getValues('username').toLowerCase()}`
        }
      />
      <Input
        {...register('name')}
        isRequired
        type='text'
        label='Name'
        color={errors?.name ? 'danger' : 'default'}
        errorMessage={errors?.name?.message}
      />
      <Input
        {...register('email')}
        isRequired
        type='email'
        label='Email'
        color={errors?.email ? 'danger' : 'default'}
        errorMessage={errors?.email?.message}
      />
      <Input
        {...register('password')}
        isRequired
        type={isPassVisible ? 'text' : 'password'}
        label='Password'
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={() => setIsPassVisible(!isPassVisible)}
          >
            {isPassVisible ? <IconEye size='20' /> : <IconEyeOff size='20' />}
          </button>
        }
        color={errors?.password ? 'danger' : 'default'}
        errorMessage={errors?.password?.message}
      />
      <Button fullWidth='true' color='primary' type='submit' isLoading={isLoading}>
        Create your account
      </Button>
    </form>
  )
}
