import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link2, Tag } from 'lucide-react'
import { api } from '../../../lib/axios'

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
  const { tripId } = useParams()

  async function addNewLinkOnTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const data = new FormData(event.currentTarget)

      const title = data.get('title')
      const url = data.get('url')

      await api
        .post(`/trips/${tripId}/links`, {
          title,
          url,
        })
        .then(() => {
          toast.success('Link criado com sucesso!')
        })

      onCloseModal()
    } catch (_) {
      toast.error(`Erro: URL inválida`)
    }
  }

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
    >
      <form className="space-y-3" onSubmit={addNewLinkOnTrip}>
        <Input
          IconType={<Tag className="size-5 text-zinc-400" />}
          name="title"
          placeholder="Título do link"
        />

        <Input
          IconType={<Link2 className="size-5 text-zinc-400" />}
          name="url"
          placeholder="URL"
        />

        <Button size="full">Salvar link</Button>
      </form>
    </Modal>
  )
}
