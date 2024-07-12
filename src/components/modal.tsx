import { ComponentProps, ReactNode } from 'react'

import { X } from 'lucide-react'

interface ModalProps extends ComponentProps<'div'> {
  children: ReactNode
  title: string
  description?: string | ReactNode
  onCloseModal: () => void
}

export function Modal({
  children,
  onCloseModal,
  title,
  description = undefined,
  ...rest
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      {...rest}
    >
      <div className="w-[540px] bg-zinc-900 px-6 py-5 flex flex-col gap-5 rounded-xl shadow-shape">
        <header className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">{title}</h2>

            <button className="hover:opacity-75" onClick={onCloseModal}>
              <X className="size-5" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">{description}</p>
        </header>

        {children}
      </div>
    </div>
  )
}
