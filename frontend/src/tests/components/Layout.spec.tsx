import Layout from '../../components/Layout/Layout'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import renderWithRouter from '../../utils/RenderWithRouter'

vi.mock('../../components/Header/Header', () => ({
  default: ({ hasBackground }: { hasBackground: boolean }) => (
    <div data-testid="header" data-has-background={hasBackground}></div>
  )
}))

describe('Layout Component', () => {
  it('should render Header with hasBackground true when on /dashboard', () => {
    renderWithRouter(<Layout />, { route: '/dashboard' })

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveAttribute('data-has-background', 'true')
  })

  it('should render Header with hasBackground false when not on /dashboard', () => {
    renderWithRouter(<Layout />, { route: '/home' })

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveAttribute('data-has-background', 'false')
  })

})