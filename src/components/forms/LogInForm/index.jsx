'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useLogIn } from '@/hooks/useLogIn'
import { LogInSchema } from '@/lib/validations/auth'

export function LogInForm() {
  const router = useRouter()
  const { onLogIn, isLoading, user, error } = useLogIn()
  const [isPassVisible, setIsPassVisible] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LogInSchema),
  })

  useEffect(() => {
    if (error) {
      toast.error('Unable to log in', {
        description: 'Confirm that your credentials are correct.',
      })
    } else if (user) {
      toast.dismiss()
      router.push('/dashboard')
    }
  }, [error, user, setError, router])

  const onSubmit = async ({ email, password }) => {
    await onLogIn(email, password)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} noValidate>
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
        Log in to your account
      </Button>
    </form>
  )
}
