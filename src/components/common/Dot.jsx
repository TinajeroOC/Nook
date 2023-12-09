import { themeClasses } from '@/lib/constants/theme'

export default function Dot({ color }) {
  return <div className={`h-4 w-4 rounded-xl ${themeClasses[color]}`}></div>
}
