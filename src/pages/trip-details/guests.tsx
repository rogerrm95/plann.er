import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'

import { CheckCircle2, CircleDashed, UserCogIcon } from 'lucide-react'

import { InviteGuestModal } from './modal/invite-guest-modal'
import { Button } from '../../components/button'

interface Participants {
  id: string
  name?: string
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()

  const [participants, setParticipants] = useState<Participants[]>([])
  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  function handleOpenInviteGuestModal() {
    setIsInviteGuestModalOpen(true)
  }

  function handleCloseInviteGuestModal() {
    setIsInviteGuestModalOpen(false)
  }

  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {participants.map((participant, index) => (
        <div className="space-y-5" key={participant.id}>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-zinc-400 text-sm truncate">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CheckCircle2 className="text-lime-300 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        size="full"
        onClick={handleOpenInviteGuestModal}
      >
        <UserCogIcon className="size-5 " />
        Gerenciar convidados
      </Button>

      {/* MODAL - CONVIDAR PARTICIPANTE */}
      {isInviteGuestModalOpen && (
        <InviteGuestModal onCloseModal={handleCloseInviteGuestModal} />
      )}
    </section>
  )
}
