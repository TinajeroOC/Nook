'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { authenticateUser } from '@/actions/user'
import { UserAuthValidation } from '@/lib/validations/user'

export default function LogInForm() {
  const router = useRouter()
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
    resolver: yupResolver(UserAuthValidation),
  })

  const onSubmit = async () => {
    const { email, password } = getValues()

    const result = await authenticateUser({
      email,
      password,
    })

    if (result?.response?.code === 400) {
      setError('email', {
        type: 'required',
      })
      setError('password', {
        type: 'required',
        message: 'Incorrect username or password',
      })
    } else {
      router.push('/dashboard')
    }
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
      <Button fullWidth='true' color='primary' type='submit'>
        Log in to your account
      </Button>
    </form>
  )
}
