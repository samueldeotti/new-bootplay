import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Albums from '../../../components/Albums/Albums';
import { AlbumModel } from '../../../models/AlbumModel';
import userEvent from '@testing-library/user-event';
import { FormatedUserMockAlbums, SpotifyMockAlbums } from '../../mocks/AlbumMock';

describe('Albums Component', () => {
  const mockAlbums: AlbumModel[] = FormatedUserMockAlbums

  const mockSpotifyAlbums = SpotifyMockAlbums;

  it('should renders albums correctly', () => {
    render(<Albums albums={mockAlbums} />);
    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 39,99')).toBeInTheDocument();
    expect(screen.getByText('Album 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 29,99')).toBeInTheDocument();
  });

  it('should renders Spotify albums correctly', () => {
    render(<Albums albums={mockSpotifyAlbums} isFromSpotify />);
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument();
    expect(screen.getByText('Test Album 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 59,99')).toBeInTheDocument();
  });

  it('should when its in collection does not open the modal', () => {
    render(<Albums albums={mockAlbums} />);
    const album1 = screen.getByText('Album 1');
    expect(album1).toBeInTheDocument();
    expect(screen.queryByText('Comprar')).not.toBeInTheDocument();
    userEvent.click(album1);
    expect(screen.queryByText('Comprar')).not.toBeInTheDocument()
  });
});