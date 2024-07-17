import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { api } from '../../lib/axios'
import { toast } from 'react-toastify'

import { User } from 'lucide-react'
import { Input } from '../../components/input'
import { Button } from '../../components/button'

export function ConfirmParticipant() {
  const { participantId } = useParams()

  async function confirmParticipantOnTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const data = new FormData(event.currentTarget)

      const name = data.get('name')

      if (!name) {
        return toast.warning('Aviso: Informar seu nome completo')
      }

      await api.patch(`participants/${participantId}/confirm`, {
        name,
      })

      window.document.location.replace('/')
    } catch (error) {
      const errorHandler = error as AxiosError
      const { message } = errorHandler.response?.data as AxiosError
      toast.error(`Erro: ${message}`)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 space-y-5 bg-zinc-900 py-5 flex flex-col rounded-xl shadow-shape">
        <h2 className="text-white text-lg font-semibold">Confirmar presença</h2>
        <p className="text-zinc-400 text-sm">
          Para confirmar presença a viagem, por favor preencha o campo abaixo:
        </p>
        <form className="space-y-3" onSubmit={confirmParticipantOnTrip}>
          <Input
            IconType={<User className="size-5 text-zinc-400" />}
            placeholder="Seu nome completo"
            name="name"
            required
          />

          <Button type="submit" size="full">
            Confirmar presença
          </Button>
        </form>
      </div>
    </div>
  )
}
