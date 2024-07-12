import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { Button } from '../../../components/button'
import { Input } from '../../../components/input'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
}: DestinationAndDateStepProps) {
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
        />

        <Input
          IconType={<Calendar className="size-5 text-zinc-400" />}
          placeholder="Quando"
          disabled={isGuestsInputOpen}
          background="transparent"
          textSize="large"
        />

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
    </>
  )
}
