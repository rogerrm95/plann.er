import { useParams } from 'react-router-dom'
import { FormEvent } from 'react'
import { api } from '../../../lib/axios'

import { toast } from 'react-toastify'
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

    try {
      const data = new FormData(event.currentTarget)

      const email = data.get('email')

      if (!email) {
        return toast.warning('Aviso: informe um e-mail!')
      }

      await api.post(`/trips/${tripId}/invites`, { email }).then(() => {
        toast.success('Convite enviado com sucesso!')
      })

      onCloseModal()
    } catch (_) {
      toast.error(`Erro: E-mail inválido`)
    }
  }

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Convidar participante"
      description="Preencha o campo de e-mail para convidar alguem a sua viagem :"
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
