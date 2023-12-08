import { Button, Card, CardBody, CardHeader, commonColors, Divider, Link } from '@nextui-org/react'
import { IconArrowRight, IconBrush, IconCamera, IconCheck, IconLink } from '@tabler/icons-react'

export default function Page() {
  return (
    <>
      <section className='flex flex-col items-center gap-4'>
        <div className='text-center leading-10'>
          <div className='inline-block'>
            <h1 className='inline text-4xl font-semibold tracking-tight lg:text-5xl'>
              Everything about yourself,&nbsp;
            </h1>
            <h1 className='inline bg-gradient-to-tr from-blue-300 to-blue-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent lg:text-5xl'>
              one link
            </h1>
            <h1 className='inline text-4xl font-semibold tracking-tight lg:text-5xl'>.</h1>
          </div>
        </div>
        <h2 className='text-center text-2xl text-default-500 lg:text-3xl'>
          Nook makes it easy to share everything you have to offer using one convenient link.
        </h2>
        <Button
          as={Link}
          href='/signup'
          color='primary'
          endContent={<IconArrowRight size='20' />}
          className='w-fit'
        >
          Get Started
        </Button>
      </section>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row gap-2'>
            <IconLink stroke='2.5' color={commonColors.blue[500]} />
            <h3 className='font-semibold'>One Link</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500'>
              Simplify your online presence: one link to manage connections, content, and showcase
              work effortlessly—saving time and effort.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className='flex flex-row gap-2'>
            <IconBrush stroke='2.5' color={commonColors.blue[500]} />
            <h3 className='font-semibold'>Personalize It</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500'>
              Make your nook unique with a personalized status, bio, profile picture, and theme that
              reflects your personality and brand.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className='flex flex-row gap-2'>
            <IconCheck stroke='2.5' color={commonColors.blue[500]} />
            <h3 className='font-semibold'>Free Forever</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500'>
              Build and manage your link without limitations or hidden fees. Start your online
              presence without breaking the bank. It&rsquo;s free, forever.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className='flex flex-row gap-2'>
            <IconCamera stroke='2.5' color={commonColors.blue[500]} />
            <h3 className='font-semibold'>For Creators</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500'>
              Elevate your creative presence by centralizing portfolio, projects, and contact info.
              Showcase work, share projects, connect with collaborators.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
