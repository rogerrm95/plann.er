import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'

import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { MapPin, Calendar, Settings2, SaveAll } from 'lucide-react'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Modal } from '../../components/modal'

interface Trip {
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()

  const [trip, setTrip] = useState<Trip | undefined>()

  const [isUpdatingTrip, setIsUpdatingTrip] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const [destination, setDestination] = useState('')

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  useEffect(() => {
    if (
      eventStartAndEndDates &&
      eventStartAndEndDates.from &&
      eventStartAndEndDates.to
    ) {
      const newTrip = {
        ...trip,
        starts_at: eventStartAndEndDates.from.toString(),
        ends_at: eventStartAndEndDates.to.toString(),
      } as Trip

      setTrip(newTrip)
    }
  }, [eventStartAndEndDates, destination])

  function handleUpdatingTripInput() {
    setIsUpdatingTrip(true)
  }

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  async function updateTrip() {
    if (trip === undefined || !trip.destination) {
      return
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: trip.starts_at,
      ends_at: trip.ends_at,
    })

    window.document.location.reload()
  }

  const displayedDate = trip
    ? format(trip.starts_at, "dd' de 'LLL")
        .concat(' até ')
        .concat(format(trip.ends_at, "dd' de 'LLL"))
    : null

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between gap-2">
      {isUpdatingTrip ? (
        <Input
          IconType={<MapPin className="size-5 text-zinc-400" />}
          placeholder="Para onde você vai ?"
          disabled={!isUpdatingTrip}
          background="transparent"
          textSize="large"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      ) : (
        <div className="flex items-center gap-2 px-4 h-14 text-lg flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <span>{trip?.destination}</span>
        </div>
      )}

      <div className="flex items-center gap-5">
        <button
          className="flex items-center gap-2 focus:outline-lime-500 outline-none"
          disabled={!isUpdatingTrip}
          onClick={openDatePicker}
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100 flex-1 text-sm">{displayedDate}</span>
        </button>

        <div className="w-px h-6 bg-zinc-800" />
        {isUpdatingTrip ? (
          <Button onClick={updateTrip}>
            Salvar
            <SaveAll className="size-5 text-lime-950" />
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleUpdatingTripInput}>
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </Button>
        )}
      </div>

      {/* MODAL - SELECIONAR DATAS */}
      {isDatePickerOpen && (
        <Modal onCloseModal={closeDatePicker} title="Selecione a data">
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
            showOutsideDays
            disabled={{ before: new Date() }}
            modifiersStyles={{
              range_start: {
                backgroundColor: '#BEF264',
                color: '#1A2E05',
              },
              range_end: {
                backgroundColor: '#BEF264',
                color: '#1A2E05',
              },
              range_middle: {
                backgroundColor: '#BEF264',
                color: '#1A2E05',
              },
            }}
          />
        </Modal>
      )}
    </header>
  )
}
