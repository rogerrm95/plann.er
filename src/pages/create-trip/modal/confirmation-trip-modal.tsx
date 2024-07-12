import { Mail, User } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'
import { Input } from '../../../components/input'

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
        <Input
          IconType={<User className="size-5 text-zinc-400" />}
          name="owner"
          placeholder="Seu nome completo"
          required
        />

        <Input
          IconType={<Mail className="size-5 text-zinc-400" />}
          type="email"
          name="email"
          placeholder="Seu e-mail pessoal"
          required
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}
