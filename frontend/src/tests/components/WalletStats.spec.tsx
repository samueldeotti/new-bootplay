import { render, screen } from '@testing-library/react'
import { WalletModel } from '../../models/UserModel'
import WalletStats from '../../components/WalletStats/WalletStats'
import { vi } from 'vitest'

describe('WalletStats Component', () => {

  const mockedSetWallet = vi.fn()

  const wallet: WalletModel = {
    balance: 1234.56,
    points: 789,
    id: '1',
    lastUpdate: '2021-09-01T00:00:00.000Z'
  }

  it('should renders the balance correctly', () => {
    render(<WalletStats wallet={wallet} setWallet={mockedSetWallet} />)
    const balanceElement = screen.getByText('R$ 1.234,56')
    expect(balanceElement).toBeInTheDocument()
  })

  it('should renders the points correctly', () => {
    render(<WalletStats wallet={wallet} setWallet={mockedSetWallet}/>)
    const pointsElement = screen.getByText('789')
    expect(pointsElement).toBeInTheDocument()
  })

  it('should renders default balance when wallet is undefined', () => {
    render(<WalletStats wallet={undefined} setWallet={mockedSetWallet}/>)
    const balanceElement = screen.getByText('R$ 0,00')
    expect(balanceElement).toBeInTheDocument()
  })

  it('should renders default points when wallet is undefined', () => {
    render(<WalletStats wallet={undefined} setWallet={mockedSetWallet}/>)
    const pointsElement = screen.getByText('0')
    expect(pointsElement).toBeInTheDocument()
  })
})