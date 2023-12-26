'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { IconAt, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createUser } from '@/actions/user'
import { getHostUrl } from '@/lib/utils'
import { UserValidation } from '@/lib/validations/user'

export default function SignUpForm() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const router = useRouter()

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

  const onSubmit = async () => {
    const { username, name, email, password } = getValues()

    const result = await createUser({
      username,
      name,
      email,
      password,
    })

    if (result?.response?.code === 400) {
      const fields = Object.keys(result?.response?.data)

      fields.forEach((field) => {
        const { message } = result?.response?.data[field]
        setError(field, {
          type: 'required',
          message,
        })
      })
    } else {
      router.push('/login')
    }
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
          `People can view your nook at ${getHostUrl()}/${getValues('username').toLowerCase()}`
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
      <Button fullWidth='true' color='primary' type='submit'>
        Create your account
      </Button>
    </form>
  )
}
