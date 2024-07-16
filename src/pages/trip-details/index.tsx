import { useState } from 'react'

import { Plus } from 'lucide-react'
import { CreateActivityModal } from './modal/create-activity-modal'
import { ImportantLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destination-and-date-header'

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
    <div className="max-w-[1100px] mx-auto px-12 lg:px-24 py-10 space-y-8">
      {/* CABEÇALHO */}
      <DestinationAndDateHeader />

      <main className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 ">
        {/* ATIVIDADES */}
        <section className="lg:flex-1 space-y-6">
          <div className="flex flex-row items-center justify-between gap-3">
            <h2 className="font-semibold text-3xl">Atividades</h2>
            <Button onClick={handleOpenCreateActivityModal}>
              <Plus className="size-4 text-lime-950 md:size-5" />
              <span className="hidden lg:block">Cadastrar atividade</span>
            </Button>
          </div>

          <Activities />

          <div className="h-px w-full bg-zinc-800 md:hidden block" />
        </section>

        {/* DETALHES */}
        <aside className="w-full lg:w-80 space-y-6">
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
