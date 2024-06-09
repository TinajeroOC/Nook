import * as Yup from 'yup'

export const LinkSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Title must be at least 1 character')
    .max(16, 'Title must be shorter than 16 characters')
    .required('Enter your title'),
  description: Yup.string().max(64, 'Description must be shorter than 64 characters'),
  url: Yup.string().url('Enter a valid url').required('Enter your url'),
  isVisible: Yup.boolean(),
})
