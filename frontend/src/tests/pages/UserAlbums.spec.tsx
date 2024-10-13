import { render, screen, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import UserAlbums from '../../pages/UserAlbums/UserAlbums';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { UserMockAlbums } from '../mocks/AlbumMock';

vi.mock('../../hooks/UseAuth');
vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('UserAlbums Page', () => {
  const mockAlbums = UserMockAlbums;

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ id: '123' });
    (api.get as Mock).mockResolvedValue({ data: mockAlbums });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set document title to "Meus Discos"', () => {
    render(<UserAlbums />);
    expect(document.title).toBe('Meus Discos');
  });

  it('should display loader initially', () => {
    render(<UserAlbums />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Meus Discos')).toBeInTheDocument();
    expect(screen.queryByText('Album 1')).not.toBeInTheDocument();
  });

  it('should fetch and display user albums that are not deleted', async () => {
    render(<UserAlbums />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/albums/my-collection/123'));

    expect(screen.getByText('Meus Discos')).toBeInTheDocument();
    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 10,00')).toBeInTheDocument();
    expect(screen.getByText('Album 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 20,00')).toBeInTheDocument();

    expect(screen.queryByText('Album 3')).not.toBeInTheDocument();
  });

  it('should display message when no albums are found', async () => {
    (api.get as Mock).mockResolvedValue({ data: [] });

    render(<UserAlbums />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/albums/my-collection/123'));

    expect(screen.getByText('Você não possui nenhum disco')).toBeInTheDocument();
  });

  it('should display error toast on fetch failure', async () => {
    (api.get as Mock).mockRejectedValue(new Error('Fetch error'));

    render(<UserAlbums />);

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/albums/my-collection/123'));

    expect(toast.error).toHaveBeenCalledWith('Erro ao buscar albums');
  });
});