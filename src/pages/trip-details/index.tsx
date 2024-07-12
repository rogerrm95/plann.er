import { useState } from 'react'
import { CreateActivityModal } from './modal/create-activity-modal'
import { ImportantLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destination-and-date-header'
import { Plus } from 'lucide-react'
import { Button } from '../../components/button'

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  function handleOpenCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function handleCloseCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }
  return (
    <div className="max-w-[1100px] mx-auto px-24 py-10 space-y-8">
      {/* CABEÇALHO */}
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        {/* ATIVIDADES */}
        <section className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-3xl">Atividades</h2>
            <Button onClick={handleOpenCreateActivityModal}>
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </section>

        {/* DETALHES */}
        <aside className="w-80 space-y-6">
          {/* LINKS IMPORTANTES */}
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800" />

          {/* CONVIDADOS */}
          <Guests />
        </aside>
      </main>

      {/* MODAL - CADASTRAR ATIVIDADE */}
      {isCreateActivityModalOpen && (
        <CreateActivityModal onCloseModal={handleCloseCreateActivityModal} />
      )}
    </div>
  )
}
