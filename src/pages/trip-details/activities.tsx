import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CircleCheck } from 'lucide-react'

interface Activity {
  date: string
  activities: Array<{
    id: string
    title: string
    occurs_at: string
  }>
}

export function Activities() {
  const { tripId } = useParams()

  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {/* LISTAR OS DIAS DA VIAGEM */}
      {activities.map((category) => {
        return (
          <div className="space-y-5" key={category.date}>
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(category.date, 'dd')}
              </span>
              <span className="text-xs text-zinc-500 first-letter:uppercase">
                {format(category.date, 'EEEE', {
                  locale: ptBR,
                })}
              </span>
            </div>
            {/* LISTAR ATIVIDADES DO DIA */}
            {category.activities.length > 0 ? (
              <div className="space-y-2.5">
                {category.activities.map((activity) => {
                  return (
                    <div
                      className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex flex-col sm:flex-row sm:items-center gap-3 "
                      key={activity.id}
                    >
                      <CircleCheck className="size-5 text-lime-300 hidden sm:block" />
                      <span
                        className="text-zinc-100 text-md line-clamp-2"
                        title={activity.title}
                      >
                        {activity.title}
                      </span>
                      <span className="text-zinc-400 sm:text-sm text-xs ml-auto">
                        {format(activity.occurs_at, "HH:mm'h'")}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nesta data.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
