import { Mail, User, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../../components/button'

interface ConfirmationTripModalProps {
  closeConfirmationTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmationTripModal({
  closeConfirmationTripModal,
  createTrip,
}: ConfirmationTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] bg-zinc-900 px-6 py-5 flex flex-col gap-5 rounded-xl shadow-shape">
        <header className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">
              Confirmar criação da viagem
            </h2>

            <button
              className="hover:opacity-75"
              onClick={closeConfirmationTripModal}
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">
            Para concluir a criação da viagem para <b>Florianópolis</b>, Brasil
            nas datas de <b>16 a 27 de Agosto de 2024</b> preencha seus dados
            abaixo:
          </p>
        </header>

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
      </div>
    </div>
  )
}
