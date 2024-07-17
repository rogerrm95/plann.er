import { FormEvent } from 'react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Mail, User } from 'lucide-react'

import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'
import { Input } from '../../../components/input'

interface ConfirmationTripModalProps {
  closeConfirmationTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  eventStartAndEndDates: DateRange | undefined
  destination: string
}

export function ConfirmationTripModal({
  destination,
  closeConfirmationTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  eventStartAndEndDates,
}: ConfirmationTripModalProps) {
  const fullTripDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "dd' de 'LLLL", { locale: ptBR })
          .concat(' até ')
          .concat(
            format(eventStartAndEndDates.to, "dd' de 'LLLL' de 'yyyy", {
              locale: ptBR,
            }),
          )
      : null

  return (
    <Modal
      onCloseModal={closeConfirmationTripModal}
      title="Confirmar criação da viagem"
      description={
        <>
          Para concluir a criação da viagem para{' '}
          <b className="text-zinc-100 font-semibold">{destination || '-'}</b>,
          nas datas de{' '}
          <b className="text-zinc-100 font-semibold">{fullTripDate || '-'}</b>{' '}
          preencha seus dados abaixo:
        </>
      }
    >
      <form className="space-y-3" onSubmit={createTrip}>
        <Input
          IconType={<User className="size-5 text-zinc-400" />}
          name="owner"
          placeholder="Seu nome completo"
          onChange={(event) => setOwnerName(event.target.value)}
        />

        <Input
          IconType={<Mail className="size-5 text-zinc-400" />}
          type="email"
          name="email"
          placeholder="Seu e-mail pessoal"
          onChange={(event) => setOwnerEmail(event.target.value)}
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}
