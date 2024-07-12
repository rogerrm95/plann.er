import { CircleDashed, UserCogIcon } from 'lucide-react'
import { Button } from '../../components/button'

export function Guests() {
  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Roger Marques
            </span>
            <span className="block text-zinc-400 text-sm truncate">
              roger@test.com
            </span>
          </div>

          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">John Doe</span>
            <span className="block text-zinc-400 text-sm truncate">
              john_doe@test.com.br
            </span>
          </div>

          <CircleDashed className="text-lime-300 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <UserCogIcon className="size-5 " />
        Gerenciar convidados
      </Button>
    </section>
  )
}
