import * as Yup from 'yup'

export const UserValidation = Yup.object().shape({
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

export const UserAuthValidation = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Enter your email'),
  password: Yup.string().required('Enter your password'),
})
