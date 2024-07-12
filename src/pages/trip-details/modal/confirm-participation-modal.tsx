import { Link2, Tag } from 'lucide-react'

// COMPONENTES //
import { Input } from '../../../components/input'
import { Modal } from '../../../components/modal'
import { Button } from '../../../components/button'

interface ConfirmParticipationModalProps {
  onCloseModal: () => void
}

export function ConfirmParticipationModal({
  onCloseModal,
}: ConfirmParticipationModalProps) {
  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Confirmar participação"
      description={
        <div className="space-y-4">
          <p>
            Você foi convidado(a) para participar de uma viagem para{' '}
            <b className="text-zinc-100 font-semibold">Florianópolis, Brasil</b>{' '}
            nas datas de{' '}
            <b className="text-zinc-100 font-semibold">
              16 a 27 de Agosto de 2024
            </b>
            .
          </p>
          <p>
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </p>
        </div>
      }
    >
      <form className="space-y-3">
        <Input
          IconType={<Tag className="size-5 text-zinc-400" />}
          name="name"
          placeholder="Seu nome completo"
          required
        />

        <Input
          IconType={<Link2 className="size-5 text-zinc-400" />}
          name="email"
          type="email"
          placeholder="Seu e-mail"
          required
        />

        <Button size="full">Confirmar minha presença</Button>
      </form>
    </Modal>
  )
}
