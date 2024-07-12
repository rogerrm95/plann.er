import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'
import { Input } from '../../../components/input'

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
    <Modal
      onCloseModal={closeGuestsModal}
      title="Selecionar convidados"
      description="Os convidados irão receber e-mails para confirmar a participação na
            viagem."
    >
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
        <Input
          IconType={<AtSign className="size-5 text-zinc-400" />}
          type="email"
          name="email"
          placeholder="Digite o e-mail do convidado"
          required
          background="transparent"
        />

        <Button type="submit">
          Convidar
          <Plus className="size-5 text-lime-950" />
        </Button>
      </form>
    </Modal>
  )
}
