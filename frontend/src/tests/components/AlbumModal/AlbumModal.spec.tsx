import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import AlbumModal from '../../../components/AlbumModal/AlbumModal';
import { api } from '../../../services/apiService';
import { useAuth } from '../../../hooks/UseAuth';
import toast from 'react-hot-toast';
import { SpotifyMockAlbums } from '../../mocks/AlbumMock';

vi.mock('../../../services/apiService');
vi.mock('../../../hooks/UseAuth');
vi.mock('react-hot-toast');

const mockUseAuth = useAuth as Mock;
const mockApiPost = api.post as Mock;
const mockToastSuccess = toast.success as Mock;
const mockToastError = toast.error as Mock;

describe('AlbumModal', () => {
  const mockedAlbum = SpotifyMockAlbums[0];

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ id: 'user-id' });
    mockApiPost.mockResolvedValue({});
    mockToastSuccess.mockClear();
    mockToastError.mockClear();
  });

  const setup = (isOpen: boolean) => {
    return render(<AlbumModal isOpen={isOpen} setIsOpen={vi.fn()} album={mockedAlbum} />);
  }

  it('should renders AlbumModal correctly when open', () => {
    setup(true);

    expect(screen.getByAltText('Album cover')).toBeInTheDocument();
    expect(screen.getByText('Comprar')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('album')).toBeInTheDocument();
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
  });

  it('should does not render AlbumModal when closed', () => {
    setup(false)

    expect(screen.queryByAltText('Album cover')).not.toBeInTheDocument();
  });

  it('should handles album purchase successfully', async () => {
    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    await waitFor(() => expect(mockApiPost).toHaveBeenCalledWith('/albums/sale', expect.any(Object)));
    expect(mockToastSuccess).toHaveBeenCalledWith('Album comprado com sucesso');
  });

  it('should handles album purchase failure', async () => {
    mockApiPost.mockRejectedValueOnce({ response: { data: { message: 'Error message' } } });

    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    await waitFor(() => expect(mockApiPost).toHaveBeenCalledWith('/albums/sale', expect.any(Object)));
    expect(mockToastError).toHaveBeenCalledWith('Algo deu errado');
  });

  it('should disables button and shows loader when loading', async () => {
    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    expect(screen.getByTestId('buy-button')).toBeDisabled();

    await waitFor(() => expect(mockApiPost).toHaveBeenCalled());
  });

  it('should handles insufficient funds error', async () => {
    mockApiPost.mockRejectedValueOnce({ 
      isAxiosError: true,
      response: { data: { message: 'Wallet does not have funds to complete the transaction!' } } 
    });

    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    await waitFor(() => expect(mockApiPost).toHaveBeenCalledWith('/albums/sale', expect.any(Object)));
    expect(mockToastError).toHaveBeenCalledWith('Saldo insuficiente');
  })
  

  it('should handles album already owned error', async () => {
    mockApiPost.mockRejectedValueOnce({ 
      isAxiosError: true,
      response: { data: { message: 'The album entered already belongs to the user' } } 
    });

    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    await waitFor(() => expect(mockApiPost).toHaveBeenCalledWith('/albums/sale', expect.any(Object)));
    expect(mockToastError).toHaveBeenCalledWith('Você já possui esse álbum');
  })

  it('should handles unknown error', async () => {
    mockApiPost.mockRejectedValueOnce({ 
      isAxiosError: false,
      response: { data: { message: 'Unknown error' } } 
    });

    setup(true);

    fireEvent.click(screen.getByTestId('buy-button'));

    await waitFor(() => expect(mockApiPost).toHaveBeenCalledWith('/albums/sale', expect.any(Object)));
    expect(mockToastError).toHaveBeenCalledWith('Algo deu errado');
  })

});