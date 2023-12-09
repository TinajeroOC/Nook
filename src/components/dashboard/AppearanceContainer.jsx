'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from '@nextui-org/react'
import { IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { updateCollectionRecord } from '@/lib/actions/data'
import { themeClasses } from '@/lib/constants/theme'

import Dot from '../common/Dot'

export default function AppearanceContainer({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [theme, setTheme] = useState(data.theme)
  const [useGradientBg, setUseGradientBg] = useState(data.useGradientBg)
  const [isNameVisible, setIsNameVisible] = useState(data.isNameVisible)
  const themes = Object.keys(themeClasses)

  const schema = Yup.object().shape({
    theme: Yup.string().oneOf(Object.keys(themeClasses), 'Theme color must be the ones listed.'),
    useGradientBg: Yup.boolean(),
    useIsNameVisible: Yup.boolean(),
  })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      theme,
      useGradientBg,
      isNameVisible,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    const { theme, useGradientBg, isNameVisible } = getValues()

    await updateCollectionRecord({
      collectionName: 'settings',
      recordId: data.id,
      data: {
        theme,
        useGradientBg,
        isNameVisible,
      },
    })

    setTheme(theme)
    setUseGradientBg(useGradientBg)
    setIsNameVisible(isNameVisible)
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <h2 className='text-2xl'>Appearance</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-2'>
        <div className='flex flex-row items-center justify-between'>
          <span>Theme</span>
          <span className='text-sm font-light'>
            <Dot color={theme} />
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <span>Gradient Background</span>
          <span className='text-sm font-light'>{useGradientBg ? 'Yes' : 'No'}</span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <span>Name Visible</span>
          <span className='text-sm font-light'>{isNameVisible ? 'Yes' : 'No'}</span>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className='justify-end'>
        <Button onPress={onOpen} size='sm' color='primary' endContent={<IconEdit size='16' />}>
          Edit
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={clearErrors} backdrop='blur'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Editing Appearance</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Select
                      {...register('theme')}
                      items={themes.map((theme) => {
                        return {
                          color: theme,
                        }
                      })}
                      label='Theme'
                      selectionMode='single'
                      defaultSelectedKeys={[theme]}
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div
                            key={item.key}
                            className='flex flex-row items-center gap-2 capitalize'
                          >
                            <Dot color={item.data.color} />
                            {item.data.color}
                          </div>
                        ))
                      }}
                    >
                      {(theme) => (
                        <SelectItem key={theme.color}>
                          <div className='flex flex-row items-center gap-2 capitalize'>
                            <Dot color={theme.color} />
                            {theme.color}
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <Switch
                      {...register('useGradientBg')}
                      defaultSelected={useGradientBg ? true : false}
                      onValueChange={(isSelected) => {
                        setValue('useGradientBg', isSelected)
                      }}
                      classNames={{
                        base: cn(
                          'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                          'justify-between cursor-pointer rounded-lg gap-8 p-1 border-2 border-transparent'
                        ),
                        wrapper: 'p-0 h-4 overflow-visible',
                        thumb: cn(
                          'w-6 h-6 border-2 shadow-lg',
                          'group-data-[selected=true]:ml-6',
                          'group-data-[pressed=true]:w-7',
                          'group-data-[selected]:group-data-[pressed]:ml-4'
                        ),
                      }}
                    >
                      <div className='flex flex-col gap-1'>
                        <p className='text-sm'>Enable gradient background</p>
                        <p className='text-xs text-default-400'>
                          Set your background to be a gradient according to your theme color.
                        </p>
                      </div>
                    </Switch>
                    <Switch
                      {...register('isNameVisible')}
                      defaultSelected={isNameVisible ? true : false}
                      onValueChange={(isSelected) => {
                        setValue('isNameVisible', isSelected)
                      }}
                      classNames={{
                        base: cn(
                          'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                          'justify-between cursor-pointer rounded-lg gap-8 p-1 border-2 border-transparent'
                        ),
                        wrapper: 'p-0 h-4 overflow-visible',
                        thumb: cn(
                          'w-6 h-6 border-2 shadow-lg',
                          'group-data-[selected=true]:ml-6',
                          'group-data-[pressed=true]:w-7',
                          'group-data-[selected]:group-data-[pressed]:ml-4'
                        ),
                      }}
                    >
                      <div className='flex flex-col gap-1'>
                        <p className='text-sm'>Enable name visibility</p>
                        <p className='text-xs text-default-400'>
                          Allow others to see your full name.
                        </p>
                      </div>
                    </Switch>
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
