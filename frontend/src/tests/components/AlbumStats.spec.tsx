
import { render, screen } from '@testing-library/react';
import AlbumStats from '../../components/AlbumStats/AlbumStats'
import { FormatedUserMockAlbums } from '../mocks/AlbumMock'


describe('AlbumStats Component', () => {
  const mockedAlbums = FormatedUserMockAlbums;

  it('should renders the balance correctly', () => {
    const MockedSum = 'R$ 69,98'
    render(<AlbumStats userAlbums={mockedAlbums} />)
    const balanceElement = screen.getByText(MockedSum)
    expect(balanceElement).toBeInTheDocument()
  })

  it('should renders the albums quantity correctly', () => {
    render(<AlbumStats userAlbums={mockedAlbums} />)
    const quantityElement = screen.getByText('2')
    expect(quantityElement).toBeInTheDocument()
  })

  it('should renders default balance when album is undefined', () => {
    render(<AlbumStats userAlbums={undefined} />)
    const balanceElement = screen.getByText('R$ 0,00')
    expect(balanceElement).toBeInTheDocument()
  })

  it('should renders default albums quantity when albums is undefined', () => {
    render(<AlbumStats userAlbums={undefined} />)
    const pointsElement = screen.getByText('0')
    expect(pointsElement).toBeInTheDocument()
  })
})