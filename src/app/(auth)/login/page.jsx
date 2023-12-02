'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link } from '@nextui-org/react'
import { IconArrowRight, IconEye, IconEyeClosed } from '@tabler/icons-react'
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
      <div className='flex flex-1 flex-col items-center justify-center py-12'>
        <Card className='w-full max-w-sm'>
          <CardHeader className='font-regular flex select-none justify-center text-2xl'>
            <h1>Log In</h1>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardBody className='flex gap-4'>
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
                    {isPassVisible ? (
                      <IconEye color={errors?.password ? 'red' : 'black'} stroke='1' />
                    ) : (
                      <IconEyeClosed color={errors?.password ? 'red' : 'black'} stroke='1' />
                    )}
                  </button>
                }
                color={errors?.password ? 'danger' : 'default'}
                errorMessage={errors?.password?.message}
                onValueChange={setPassword}
              />
            </CardBody>
            <CardFooter>
              <Button fullWidth='true' color='primary' type='submit'>
                Log In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <footer>
        <div className='flex items-center justify-center gap-2 text-sm'>
          <p>Don&rsquo;t have an account?</p>
          <Button as={Link} color='default' href='signup' variant='flat'>
            Sign Up
            <IconArrowRight size='16' color='black' stroke='1.5' />
          </Button>
        </div>
      </footer>
    </>
  )
}
