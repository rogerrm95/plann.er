import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { subHours } from 'date-fns'
import { api } from '../../../lib/axios'
import { Calendar, Tag } from 'lucide-react'

// COMPONENTES //
import { Button } from '../../../components/button'
import { Modal } from '../../../components/modal'
import { Input } from '../../../components/input'
import { DateRange } from 'react-day-picker'

interface CreateActivityModalProps {
  onCloseModal: () => void
}

export function CreateActivityModal({
  onCloseModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams()

  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => {
      console.log(response.data)

      setEventStartAndEndDates({
        from: response.data.starts_a,
        to: response.data.ends_at,
      })
    })
  }, [tripId])

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occursAt = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    })

    window.document.location.reload()
  }

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
    >
      <form className="space-y-3" onSubmit={createActivity}>
        <Input
          IconType={<Tag className="size-5 text-zinc-400" />}
          name="title"
          placeholder="Qual a atividade?"
        />

        <Input
          IconType={<Calendar className="size-5 text-zinc-400" />}
          type="datetime-local"
          name="occurs_at"
          className="bg-transparent placeholder-zinc-400 outline-none flex-1"
          min={subHours(new Date(), 3).toISOString().slice(0, -8)}
          max={
            eventStartAndEndDates?.to
              ? subHours(eventStartAndEndDates?.to, 3)
                  .toISOString()
                  .slice(0, -8)
              : undefined
          }
        />

        <Button size="full" type="submit">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}
