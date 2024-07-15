import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { InviteGuestsModal } from './modal/invite-guests-modal'
import { ConfirmationTripModal } from './modal/confirmation-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

import { DateRange } from 'react-day-picker'

import { api } from '../../lib/axios'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmationTripModalOpen, setIsConfirmationTripModalOpen] =
    useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  function handleOpenGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function handleCloseGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function handleOpenGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function handleCloseGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function handleOpenConfirmationTripModal() {
    setIsConfirmationTripModalOpen(true)
  }

  function handleCloseConfirmationTripModal() {
    setIsConfirmationTripModalOpen(false)
  }

  function addEmailGuestOnList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailGuestOnList(email: string) {
    const newEmailsList = emailsToInvite.filter((item) => {
      return item !== email
    })

    setEmailsToInvite(newEmailsList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerEmail || !ownerName) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex items-center justify-center flex-col gap-3">
          <img src="./logo.svg" alt="Logo Planner" />
          <p className="text-zinc text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          {/* FORM - LOCALIDADE E DATAS */}
          <DestinationAndDateStep
            closeGuestsInput={handleCloseGuestsInput}
            openGuestsInput={handleOpenGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          {/* FORM - CONVIDAR PESSOAS */}
          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmationTripModal={handleOpenConfirmationTripModal}
              openGuestsModal={handleOpenGuestsModal}
            />
          )}
        </div>

        {/* TERMOS */}
        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {/* MODAL - CONVIDAR PESSOAS */}
      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addEmailGuestOnList={addEmailGuestOnList}
          closeGuestsModal={handleCloseGuestsModal}
          removeEmailGuestOnList={removeEmailGuestOnList}
        />
      )}

      {/* MODAL - CONFIRMAÇÃO DA VIAGEM */}
      {isConfirmationTripModalOpen && (
        <ConfirmationTripModal
          closeConfirmationTripModal={handleCloseConfirmationTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
        />
      )}
    </div>
  )
}
