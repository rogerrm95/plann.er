import { useState } from 'react'

import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'

import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// COMPONENTES //
import { Button } from '../../../components/button'
import { Input } from '../../../components/input'
import { Modal } from '../../../components/modal'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "dd' de 'LLL", { locale: ptBR })
          .concat(' até ')
          .concat(
            format(eventStartAndEndDates.to, "dd' de 'LLL", { locale: ptBR }),
          )
      : null

  return (
    <>
      {/* FORM - LOCALIDADE */}
      <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
        <Input
          IconType={<MapPin className="size-5 text-zinc-400" />}
          placeholder="Para onde você vai ?"
          disabled={isGuestsInputOpen}
          background="transparent"
          textSize="large"
          onChange={(event) => setDestination(event.target.value)}
        />

        <button
          className="flex items-center gap-2 focus:outline-lime-500 outline-none px-4 rounded-lg h-14 text-left w-[240px]"
          disabled={isGuestsInputOpen}
          onClick={openDatePicker}
        >
          <Calendar className="size-5 text-zinc-400" />
          {displayedDate ? (
            <span className="text-zinc-400 flex-1 text-sm">
              {displayedDate}
            </span>
          ) : (
            <span className="text-zinc-400 flex-1 text-lg">Quando</span>
          )}
        </button>

        <div className="w-px h-6 bg-zinc-800" />

        {isGuestsInputOpen ? (
          <Button onClick={closeGuestsInput} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </Button>
        ) : (
          <Button onClick={openGuestsInput}>
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </Button>
        )}
      </div>

      {isDatePickerOpen && (
        <Modal onCloseModal={closeDatePicker} title="Selecione a data">
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
            disabled={{ before: new Date() }}
            locale={ptBR}
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
            style={{ textTransform: 'uppercase' }}
          />
        </Modal>
      )}
    </>
  )
}
