import * as Yup from 'yup'

import { ColorClasses } from '@/lib/constants/theme'

export const ProfileSchema = Yup.object().shape({
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
  about: Yup.string().max(128, 'About must be shorter than 128 characters'),
})

export const AppearanceSchema = Yup.object().shape({
  theme: Yup.string().oneOf(Object.keys(ColorClasses), 'Theme color selection is invalid'),
  useGradientBg: Yup.boolean(),
  useIsNameVisible: Yup.boolean(),
})
