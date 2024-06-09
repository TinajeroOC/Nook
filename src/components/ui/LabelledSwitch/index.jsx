import { forwardRef, useSwitch, VisuallyHidden } from '@nextui-org/react'
import { cloneElement } from 'react'

export const LabelledSwitch = forwardRef((props, ref) => {
  const { label, description } = props
  const {
    Component,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getStartContentProps,
    getEndContentProps,
    slots,
  } = useSwitch({ ...props, ref })

  const clonedThumbIcon =
    typeof thumbIcon === 'function'
      ? thumbIcon(getThumbIconProps({ includeStateProps: true }))
      : thumbIcon && cloneElement(thumbIcon, getThumbIconProps())

  const clonedStartContent = startContent && cloneElement(startContent, getStartContentProps())
  const clonedEndContent = endContent && cloneElement(endContent, getEndContentProps())

  return (
    <>
      <Component
        {...getBaseProps()}
        className={slots.base({
          class: [
            'inline-flex w-full max-w-md flex-row-reverse items-center hover:bg-default-100',
            'cursor-pointer justify-between gap-8 rounded-xl border-2 border-transparent py-2 pl-3',
          ],
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          {startContent && clonedStartContent}
          <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
          {endContent && clonedEndContent}
        </span>
        <span {...getLabelProps()}>
          <div className='flex flex-col gap-1'>
            {label && <p className='text-sm text-default-500'>{label}</p>}
            {description && <p className='text-xs'>{description}</p>}
          </div>
        </span>
      </Component>
    </>
  )
})
