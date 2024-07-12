import { Calendar, Tag } from 'lucide-react'
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'
import { Input } from '../../../components/input'

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
        <Input
          IconType={<Tag className="size-5 text-zinc-400" />}
          name="title"
          placeholder="Qual a atividade?"
          required
        />

        <Input
          IconType={<Calendar className="size-5 text-zinc-400" />}
          type="datetime-local"
          name="occurs_at"
          placeholder="17 de Agosto"
          className="bg-transparent placeholder-zinc-400 outline-none flex-1"
          required
        />

        <Button size="full">Salvar atividade</Button>
      </form>
    </Modal>
  )
}
