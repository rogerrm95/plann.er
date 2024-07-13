import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Link2, Tag } from 'lucide-react'

// COMPONENTES //
import { Input } from '../../../components/input'
import { Modal } from '../../../components/modal'
import { Button } from '../../../components/button'
import { api } from '../../../lib/axios'

interface CreateImportantLinkModalProps {
  onCloseModal: () => void
}

export function CreateImportantLinkModal({
  onCloseModal,
}: CreateImportantLinkModalProps) {
  const { tripId } = useParams()

  async function addNewLinkOnTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')
    const url = data.get('url')

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    window.document.location.reload()
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
