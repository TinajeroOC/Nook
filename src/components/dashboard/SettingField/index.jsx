function renderField(value) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  return value ? value : 'None'
}

export default function SettingField({ label, value, direction = 'col' }) {
  return (
    <div
      className={`flex ${
        direction === 'row' ? 'flex-row items-center justify-between' : 'flex-col'
      }`}
    >
      <span>{label}</span>
      <span className='text-sm text-default-500'>{renderField(value)}</span>
    </div>
  )
}
