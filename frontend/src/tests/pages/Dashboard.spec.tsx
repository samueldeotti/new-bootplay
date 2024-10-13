import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { Dashboard } from '../../pages/Dashboard/Dashboard';
import { api } from '../../services/apiService';
import toast from 'react-hot-toast';
import { SpotifyMockAlbums, SpotifySearchMockAlbums } from '../mocks/AlbumMock';

vi.mock('../../services/apiService');
vi.mock('react-hot-toast');

describe('Dashboard Page', () => {

  const MockedAlbums = SpotifyMockAlbums;

  const SearchMockedAlbums = SpotifySearchMockAlbums

  beforeEach(() => {
    (api.get as Mock).mockResolvedValue({ data: MockedAlbums });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set document title to "Dashboard"', () => {
    render(<Dashboard />);
    expect(document.title).toBe('Dashboard');
  });

  it('should render the Dashboard component', () => {
    render(<Dashboard />);
    expect(screen.getByText('A história da música não pode ser esquecida!')).toBeInTheDocument();
    expect(screen.getByText('Sucessos que marcaram o tempo!!!')).toBeInTheDocument();

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Procurar')).toBeInTheDocument();

    expect(screen.getByText('Trends')).toBeInTheDocument();
  });

  it('should display loader initially', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Trends')).toBeInTheDocument();
    expect(screen.queryByText('Test Album')).not.toBeInTheDocument();
  });

  it('should fetch and display initial albums on mount', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/albums/all?search=Rock');
    });

    expect(screen.getByText('Trends')).toBeInTheDocument();

    
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument();
    expect(screen.getByText('Test Album 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 59,99')).toBeInTheDocument();

  })

  it('should open album details modal when album is clicked', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/albums/all?search=Rock');
    });

    const album = screen.getByText('Test Album');
    fireEvent.click(album);

    expect(screen.getByText('Comprar')).toBeInTheDocument();
    expect(screen.getByText('Tipo:')).toBeInTheDocument();
    expect(screen.getByText('Preço:')).toBeInTheDocument();
    expect(screen.getByText('Data de Lançamento:')).toBeInTheDocument();
    expect(screen.getByText('Artistas:')).toBeInTheDocument();

    expect(screen.getByText('01/10/2023')).toBeInTheDocument();
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
  })

  it('should render the blur container', () => {
    render(<Dashboard />);
    const gradientOverlay = screen.getByTestId('gradient-overlay');
    expect(gradientOverlay).toBeInTheDocument();
    expect(gradientOverlay).toHaveClass('absolute bottom-[-10px] left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0f] to-transparent');
  })


  it('should handle search and display results', async () => {
    (api.get as Mock).mockResolvedValue({ data: SearchMockedAlbums });
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText('Procurar');
    fireEvent.change(searchInput, { target: { value: 'Jazz' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/albums/all?search=Jazz');
    });

    expect(screen.getByText('Test Album Jazz')).toBeInTheDocument();
    expect(screen.getByText('R$ 20,22')).toBeInTheDocument();
    expect(screen.getByText('Test Album 2 Jazz')).toBeInTheDocument();
    expect(screen.getByText('R$ 30,00')).toBeInTheDocument();

    expect(screen.queryByText('Trends')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Album')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Album 2')).not.toBeInTheDocument();
  });

  it('should display Rock albums when search is empty', async () => {
    (api.get as Mock).mockResolvedValue({ data: SearchMockedAlbums });
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText('Procurar');
    fireEvent.change(searchInput, { target: { value: '' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/albums/all?search=Rock');
    });

    expect(screen.queryByText('Trends')).toBeInTheDocument();
    expect(screen.getByText('Test Album Jazz')).toBeInTheDocument();
    expect(screen.getByText('R$ 20,22')).toBeInTheDocument();
    expect(screen.getByText('Test Album 2 Jazz')).toBeInTheDocument();
    expect(screen.getByText('R$ 30,00')).toBeInTheDocument();
  })

  it('should display error toast on API error', async () => {
    (api.get as Mock).mockRejectedValue(new Error('API Error'));
    render(<Dashboard />);
    await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith('Erro ao buscar albums');
    })
    expect(screen.queryByText('Test Album')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Album 2')).not.toBeInTheDocument();
  })

});