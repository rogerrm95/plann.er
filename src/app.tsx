import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'
import { ConfirmParticipant } from './pages/confirm-participant'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
  {
    path: '/participants/:participantId/confirm',
    element: <ConfirmParticipant />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
