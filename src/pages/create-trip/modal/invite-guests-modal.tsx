import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../../components/button'

interface InviteGuestsModalProps {
  removeEmailGuestOnList: (email: string) => void
  addEmailGuestOnList: (event: FormEvent<HTMLFormElement>) => void
  closeGuestsModal: () => void
  emailsToInvite: string[]
}

export function InviteGuestsModal({
  addEmailGuestOnList,
  closeGuestsModal,
  emailsToInvite,
  removeEmailGuestOnList,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] bg-zinc-900 px-6 py-5 flex flex-col gap-5 rounded-xl shadow-shape">
        <header className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">
              Selecionar convidados
            </h2>

            <button className="hover:opacity-75" onClick={closeGuestsModal}>
              <X className="size-5" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </header>

        <ul className="flex gap-2 flex-wrap">
          {emailsToInvite.map((email) => {
            return (
              <li
                key={email}
                className="bg-zinc-800 rounded-md text-zinc-300 py-1.5 px-2.5 flex items-center gap-2"
              >
                {email}{' '}
                <button
                  onClick={() => removeEmailGuestOnList(email)}
                  type="button"
                >
                  <X className="text-zinc-400 size-4 cursor-pointer hover:text-lime-500" />
                </button>
              </li>
            )
          })}
        </ul>

        <div className="h-px w-full bg-zinc-800" />

        <form
          className="h-14 p-2.5 bg-zinc-950 rounded-xl flex items-center gap-3"
          onSubmit={addEmailGuestOnList}
        >
          <div className="flex items-center gap-2 flex-1 px-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5 text-lime-950" />
          </Button>
        </form>
      </div>
    </div>
  )
}
