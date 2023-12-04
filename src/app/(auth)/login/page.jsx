'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Link } from '@nextui-org/react'
import { IconArrowRight, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Enter your email'),
  password: Yup.string().required('Enter your password'),
})

export default function Page() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (event) => {
    try {
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      router.push('/')
    } catch (error) {}
  }

  return (
    <>
      <div className='grid min-h-screen grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1'>
        <div className='relative flex flex-col items-center justify-center gap-4 px-16'>
          <h1 className='mb-2 text-2xl font-semibold sm:text-4xl'>Log In</h1>
          <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='flex flex-col gap-4'>
              <Input
                {...register('email')}
                isRequired
                type='email'
                label='Email'
                color={errors?.email ? 'danger' : 'default'}
                errorMessage={errors?.email?.message}
                onValueChange={setEmail}
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
                onValueChange={setPassword}
              />
              <Button fullWidth='true' color='primary' type='submit'>
                Log in to your account
              </Button>
            </div>
          </form>
          <footer>
            <div className='flex items-center justify-center gap-2 text-sm'>
              <p>Don&rsquo;t have an account?</p>
              <Button as={Link} color='default' href='signup' variant='flat'>
                Sign Up
                <IconArrowRight size='20' />
              </Button>
            </div>
          </footer>
        </div>
        <div className='flex flex-col items-center justify-center bg-gradient-to-tl from-blue-700 to-blue-600 px-16 text-white'>
          <div className='flex max-w-lg flex-col items-start'>
            <a href='/' className='mb-4 text-2xl font-semibold sm:text-4xl'>
              Nook
            </a>
            <p className='mb-4 text-4xl font-semibold sm:text-6xl'>Welcome back!</p>
            <p className='text-xl font-light'>
              Enter your login credentials to personalize your Nook.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
