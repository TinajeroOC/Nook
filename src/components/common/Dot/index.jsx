import { ColorClasses } from '@/lib/constants/theme'

export default function Dot({ color }) {
  return <div className={`h-4 w-4 rounded-xl ${ColorClasses[color]}`}></div>
}
