import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Album from '../../../components/Albums/Album';
import { FormatedUserMockAlbums, SpotifyMockAlbums } from '../../mocks/AlbumMock';

const mockedAlbum = FormatedUserMockAlbums[0];

const mockedSpotifyAlbum = { ...SpotifyMockAlbums[0], name: 'Spotify Album' };

describe('Album Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders Album component with AlbumModel', () => {
    render(<Album album={mockedAlbum} />);
    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
  });

  it('should renders Album component with SpotifyAlbumModel', () => {
    render(<Album album={mockedSpotifyAlbum} isFromSpotify />);
    expect(screen.getByText('Spotify Album')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument();
  });

  it('should does not render AlbumModal when isCollection is true', () => {
    render(<Album album={mockedAlbum} />);
    expect(screen.queryByText('Comprar')).not.toBeInTheDocument();
  });


});