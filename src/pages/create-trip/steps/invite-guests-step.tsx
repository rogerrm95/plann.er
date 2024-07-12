import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  emailsToInvite: string[]
  openGuestsModal: () => void
  openConfirmationTripModal: () => void
}

export function InviteGuestsStep({
  emailsToInvite,
  openConfirmationTripModal,
  openGuestsModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <UserRoundPlus className="size-5 text-zinc-400" />
        <button
          className="bg-transparent text-lg text-zinc-400 outline-none flex-1 text-left"
          onClick={openGuestsModal}
        >
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span>Para onde você vai ?</span>
          )}
        </button>
      </div>

      <Button onClick={openConfirmationTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5 text-lime-950" />
      </Button>
    </div>
  )
}
