import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'

import { Link2, Plus } from 'lucide-react'

import { Button } from '../../components/button'

import { CreateImportantLinkModal } from './modal/create-important-link-modal'

interface ImportantLinks {
  links: {
    id: string
    title: string
    url: string
  }[]
}

export function ImportantLinks() {
  const { tripId } = useParams()

  const [importantLinks, setImportantLinks] = useState<ImportantLinks>()

  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setImportantLinks(response.data))
  }, [tripId])

  function handleOpenNewLinkModal() {
    setIsNewLinkModalOpen(true)
  }

  function handleCloseNewLinkModal() {
    setIsNewLinkModalOpen(false)
  }

  function copyLinkToClipboard(link: string) {
    navigator.clipboard.writeText(link)
  }

  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      {importantLinks &&
        importantLinks.links.map((link) => (
          <div className="space-y-5" key={link.id}>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>

              <Link2
                className="text-zinc-400 size-7 lg:size-5 shrink-0 hover:text-lime-500 transition-colors delay-75 cursor-pointer"
                onClick={() => copyLinkToClipboard(link.url)}
              />
            </div>
          </div>
        ))}

      <Button variant="secondary" size="full" onClick={handleOpenNewLinkModal}>
        <Plus className="size-5 " />
        Cadastrar novo link
      </Button>

      {/* MODAL - CADASTRAR NOVO LINK */}
      {isNewLinkModalOpen && (
        <CreateImportantLinkModal onCloseModal={handleCloseNewLinkModal} />
      )}
    </section>
  )
}
