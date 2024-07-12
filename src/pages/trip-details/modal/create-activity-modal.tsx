import { Calendar, Tag, X } from 'lucide-react'
import { Button } from '../../../components/button'

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] bg-zinc-900 px-6 py-5 flex flex-col gap-5 rounded-xl shadow-shape">
        <header className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">
              Cadastrar atividade
            </h2>

            <button
              className="hover:opacity-75"
              onClick={closeCreateActivityModal}
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="text-zinc-400 text-sm">
            Todos convidados podem visualizar as atividades.
          </p>
        </header>

        <form className="space-y-3">
          <div className="flex items-center gap-2 flex-1 px-4 bg-zinc-950 rounded-lg h-14">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <div className="flex items-center gap-2 flex-1 px-4 bg-zinc-950 rounded-lg h-14">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="17 de Agosto"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
