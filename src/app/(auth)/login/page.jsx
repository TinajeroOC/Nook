'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link } from '@nextui-org/react'
import { IconArrowRight, IconEye, IconEyeClosed } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleOnSubmit = async (event) => {
    event?.preventDefault()
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
          <form onSubmit={handleOnSubmit}>
            <CardBody className='flex gap-4'>
              <Input isRequired type='email' label='Email' onValueChange={setEmail} />
              <Input
                isRequired
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={() => setIsPassVisible(!isPassVisible)}
                  >
                    {isPassVisible ? (
                      <IconEye color='black' stroke='1' />
                    ) : (
                      <IconEyeClosed color='black' stroke='1' />
                    )}
                  </button>
                }
                type={isPassVisible ? 'text' : 'password'}
                label='Password'
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
