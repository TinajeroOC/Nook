'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateCollectionRecord } from '@/actions/data'
import Dot from '@/components/common/Dot'
import LabelledSwitch from '@/components/common/LabelledSwitch'
import SettingField from '@/components/dashboard/SettingField'
import { ColorClasses } from '@/lib/constants/theme'
import { AppearanceValidation } from '@/lib/validations/settings'

export default function AppearanceCard({ data }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const themes = Object.keys(ColorClasses)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { defaultValues, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      theme: data.settings.theme,
      useGradientBg: data.settings.useGradientBg,
      isNameVisible: data.settings.isNameVisible,
    },
    resolver: yupResolver(AppearanceValidation),
  })

  const onSubmit = async () => {
    const { theme, useGradientBg, isNameVisible } = getValues()

    await updateCollectionRecord('settings', data.settings.id, {
      theme,
      useGradientBg,
      isNameVisible,
    })
  }

  useEffect(() => {
    const { theme, useGradientBg, isNameVisible } = getValues()

    reset({
      theme,
      useGradientBg,
      isNameVisible,
    })

    onClose()
  }, [isSubmitSuccessful])

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between gap-2'>
        <h2 className='text-2xl'>Appearance</h2>
        <Button onPress={onOpen} size='sm' color='default' variant='flat'>
          Edit
        </Button>
      </CardHeader>
      <CardBody className='gap-2'>
        <SettingField label='Theme' value={<Dot color={defaultValues.theme} />} direction='row' />
        <SettingField
          label='Gradient Background'
          value={defaultValues.useGradientBg}
          direction='row'
        />
        <SettingField label='Name Visible' value={defaultValues.isNameVisible} direction='row' />
      </CardBody>
      <CardFooter>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset} backdrop='blur'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Appearance</ModalHeader>
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
                      defaultSelectedKeys={[defaultValues.theme]}
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
                      errorMessage={errors?.theme?.message}
                    >
                      {(theme) => (
                        <SelectItem key={theme.color} textValue={theme.color}>
                          <div className='flex flex-row items-center gap-2 capitalize'>
                            <Dot color={theme.color} />
                            {theme.color}
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <LabelledSwitch
                      {...register('useGradientBg')}
                      label='Enable gradient background'
                      description='Set your background to be a gradient'
                      defaultSelected={defaultValues.useGradientBg ? true : false}
                      onValueChange={(isSelected) => {
                        setValue('useGradientBg', isSelected)
                      }}
                    />
                    <LabelledSwitch
                      {...register('isNameVisible')}
                      label='Enable name visibility'
                      description='Allow others to see your full name'
                      defaultSelected={defaultValues.isNameVisible ? true : false}
                      onValueChange={(isSelected) => {
                        setValue('isNameVisible', isSelected)
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color='primary' type='submit'>
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
