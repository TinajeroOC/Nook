import { ColorClasses } from '@/lib/constants/theme'

const DotSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const DotRadiusClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export default function Dot({ color, size = 'sm', radius = 'full' }) {
  return (
    <div className={`${ColorClasses[color]} ${DotSizeClasses[size]} ${DotRadiusClasses[radius]}`} />
  )
}
