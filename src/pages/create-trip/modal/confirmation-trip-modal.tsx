import { Mail, User } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'

interface ConfirmationTripModalProps {
  closeConfirmationTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmationTripModal({
  closeConfirmationTripModal,
  createTrip,
}: ConfirmationTripModalProps) {
  return (
    <Modal
      onCloseModal={closeConfirmationTripModal}
      title="Confirmar criação da viagem"
      description={
        <p>
          Para concluir a criação da viagem para{' '}
          <b className="text-zinc-100 font-semibold">Florianópolis</b>, Brasil
          nas datas de{' '}
          <b className="text-zinc-100 font-semibold">
            16 a 27 de Agosto de 2024
          </b>{' '}
          preencha seus dados abaixo:
        </p>
      }
    >
      <form className="space-y-3" onSubmit={createTrip}>
        <div className="flex items-center gap-2 flex-1 px-4 bg-zinc-950 rounded-lg h-14">
          <User className="size-5 text-zinc-400" />
          <input
            type="text"
            name="owner"
            placeholder="Seu nome completo"
            className="bg-transparent placeholder-zinc-400 outline-none flex-1"
            required
          />
        </div>

        <div className="flex items-center gap-2 flex-1 px-4 bg-zinc-950 rounded-lg h-14">
          <Mail className="size-5 text-zinc-400" />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal"
            className="bg-transparent placeholder-zinc-400 outline-none flex-1"
            required
          />
        </div>

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}
