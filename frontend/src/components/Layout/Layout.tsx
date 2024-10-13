import Header from '../Header/Header'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {

  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <>
      <Header hasBackground={isDashboard} />
      <Outlet />
    </>
  )
}
