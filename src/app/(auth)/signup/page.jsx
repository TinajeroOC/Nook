'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Link } from '@nextui-org/react'
import { IconArrowRight, IconAt, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { createUser } from '@/lib/actions/auth'

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
  email: Yup.string().email('Enter a valid email').required('Enter your email'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Enter your password'),
})

export default function Page() {
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
    resolver: yupResolver(schema),
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
    <div className='grid min-h-screen grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1'>
      <div className='flex flex-col items-center justify-center gap-4 px-16 py-8'>
        <h1 className='mb-2 text-2xl font-semibold sm:text-4xl'>Sign Up</h1>
        <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='flex flex-col gap-4'>
            <Input
              {...register('username')}
              isRequired
              label='Username'
              startContent={<IconAt size='20' />}
              color={errors?.username ? 'danger' : 'default'}
              errorMessage={errors?.username?.message}
              description={
                watch('username') &&
                `People can view your nook at ${window.location.host}/${getValues(
                  'username'
                ).toLowerCase()}`
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
          </div>
        </form>
        <footer>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <p>Already have an account?</p>
            <Button as={Link} color='default' href='login' variant='flat'>
              Log In
              <IconArrowRight size='20' />
            </Button>
          </div>
        </footer>
      </div>
      <div className='flex flex-col items-center justify-center bg-gradient-to-tl from-blue-700 to-blue-600 px-16 py-8 text-white'>
        <div className='flex max-w-lg flex-col items-start'>
          <a href='/' className='mb-4 text-3xl font-semibold sm:text-4xl'>
            Nook
          </a>
          <p className='mb-4 text-5xl font-semibold sm:text-6xl'>
            Everything about yourself, one link.
          </p>
          <p className='text-xl font-light'>
            Spread thin across the internet? Nook makes it easy with one, convenient link. Create an
            account today to get started!
          </p>
        </div>
      </div>
    </div>
  )
}
