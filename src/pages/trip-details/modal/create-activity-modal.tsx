import { Calendar, Tag } from 'lucide-react'
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  return (
    <Modal
      onCloseModal={closeCreateActivityModal}
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
    >
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
    </Modal>
  )
}
