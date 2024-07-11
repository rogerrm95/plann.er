import { FormEvent, useState } from 'react'

import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  Plus,
  AtSign,
} from 'lucide-react'

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'roger@test.com.br',
    'johndoe@test.com',
    'John_testing@test.com',
  ])

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
          {/* FORM - LOCALIDADE */}
          <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai ?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                disabled={isGuestsInputOpen}
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Quando"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
                disabled={isGuestsInputOpen}
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />
            {isGuestsInputOpen ? (
              <button
                className="bg-zinc-800 text-zinc-200 rounded-lg flex items-center gap-2 px-5 py-2 font-medium hover:bg-zinc-700 transition-colors delay-100"
                onClick={handleCloseGuestsInput}
              >
                Alterar local/data
                <Settings2 className="size-5 text-zinc-200" />
              </button>
            ) : (
              <button
                className="bg-lime-300 text-lime-950 rounded-lg flex items-center gap-2 px-5 py-2 font-medium hover:bg-lime-400 transition-colors delay-100"
                onClick={handleOpenGuestsInput}
              >
                Continuar
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            )}
          </div>

          {/* FORM - CONVIDAR PESSOAS */}
          {isGuestsInputOpen && (
            <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
              <div className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <button
                  className="bg-transparent text-lg text-zinc-400 outline-none flex-1 text-left"
                  onClick={handleOpenGuestsModal}
                >
                  <span>Para onde você vai ?</span>
                </button>
              </div>

              <button className="bg-lime-300 text-lime-950 rounded-lg flex items-center gap-2 px-5 py-2 font-medium hover:bg-lime-400 transition-colors delay-100">
                Continuar viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] bg-zinc-900 px-6 py-5 flex flex-col gap-5 rounded-xl shadow-shape">
            <header className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-lg font-semibold">
                  Selecionar convidados
                </h2>

                <button
                  className="hover:opacity-75"
                  onClick={handleCloseGuestsModal}
                >
                  <X className="size-5" />
                </button>
              </div>

              <p className="text-zinc-400 text-sm">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </header>

            <ul className="flex gap-2 flex-wrap">
              {emailsToInvite.map((email) => {
                return (
                  <li
                    key={email}
                    className="bg-zinc-800 rounded-md text-zinc-300 py-1.5 px-2.5 flex items-center gap-2"
                  >
                    {email}{' '}
                    <button
                      onClick={() => removeEmailGuestOnList(email)}
                      type="button"
                    >
                      <X className="text-zinc-400 size-4 cursor-pointer hover:text-lime-500" />
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="h-px w-full bg-zinc-800" />

            <form
              className="h-14 p-2.5 bg-zinc-950 rounded-xl flex items-center gap-3"
              onSubmit={addEmailGuestOnList}
            >
              <div className="flex items-center gap-2 flex-1 px-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                  required
                />
              </div>

              <button
                className="bg-lime-300 text-lime-950 rounded-lg flex items-center gap-2 px-5 py-2 font-medium hover:bg-lime-400 transition-colors delay-100"
                type="submit"
              >
                Convidar
                <Plus className="size-5 text-lime-950" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
