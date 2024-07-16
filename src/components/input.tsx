import { ComponentProps } from 'react'

import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'flex items-center gap-2 px-4 bg-zinc-950 rounded-lg h-14 flex-1 focus-within:outline focus-within:outline-lime-500 focus-within:outline-1',
  variants: {
    background: {
      default: 'bg-zinc-950',
      transparent: 'bg-transparent',
    },
    textSize: {
      normal: 'text-md',
      large: 'text-lg',
    },
    paddingX: {
      none: 'px-0',
      small: 'px-2',
      base: 'px-4',
      high: 'px-6',
    },
    paddingY: {
      none: 'py-0',
      small: 'py-2',
      base: 'py-4',
      high: 'py-6',
    },
  },
  defaultVariants: {
    background: 'default',
    textSize: 'normal',
    paddingX: 'base',
    paddingY: 'none',
  },
})

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  IconType?: JSX.Element
}

export function Input({
  IconType,
  background,
  textSize,
  paddingX,
  paddingY,
  ...rest
}: InputProps) {
  return (
    <div
      className={inputVariants({ background, textSize, paddingY, paddingX })}
    >
      {IconType}
      <input
        className="bg-transparent placeholder-zinc-400 outline-none flex-1 disabled:text-sm truncate"
        {...rest}
      />
    </div>
  )
}
