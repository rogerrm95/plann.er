import { useParams } from 'react-router-dom'
import { FormEvent } from 'react'
import { api } from '../../../lib/axios'

import { Mail } from 'lucide-react'

// COMPONENTES //
import { Input } from '../../../components/input'
import { Modal } from '../../../components/modal'
import { Button } from '../../../components/button'

interface InviteGuestModalProps {
  onCloseModal: () => void
}

export function InviteGuestModal({ onCloseModal }: InviteGuestModalProps) {
  const { tripId } = useParams()

  async function inviteGuestOnTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')

    console.log(email)

    await api.post(`/trips/${tripId}/invites`, { email })

    window.document.location.reload()
  }

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Confirmar participação"
      description="Preencha os dados abaixo para convidar uma pessoa a sua viagem:"
    >
      <form className="space-y-3" onSubmit={inviteGuestOnTrip}>
        <Input
          IconType={<Mail className="size-5 text-zinc-400" />}
          name="email"
          type="email"
          placeholder="Seu e-mail"
        />

        <Button size="full">Convidar</Button>
      </form>
    </Modal>
  )
}
