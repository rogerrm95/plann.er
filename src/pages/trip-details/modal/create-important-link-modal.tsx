import { Link2, Tag } from 'lucide-react'

// COMPONENTES //
import { Input } from '../../../components/input'
import { Modal } from '../../../components/modal'
import { Button } from '../../../components/button'

interface CreateImportantLinkModalProps {
  onCloseModal: () => void
}

export function CreateImportantLinkModal({
  onCloseModal,
}: CreateImportantLinkModalProps) {
  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
    >
      <form className="space-y-3">
        <Input
          IconType={<Tag className="size-5 text-zinc-400" />}
          name="link"
          placeholder="Título do link"
          required
        />

        <Input
          IconType={<Link2 className="size-5 text-zinc-400" />}
          name="url"
          placeholder="URL"
          required
        />

        <Button size="full">Salvar link</Button>
      </form>
    </Modal>
  )
}
