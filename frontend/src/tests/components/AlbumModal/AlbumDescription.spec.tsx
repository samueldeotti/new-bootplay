import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AlbumDescription from '../../../components/AlbumModal/AlbumDescription';
import { SpotifyMockAlbums } from '../../mocks/AlbumMock';

const mockedAlbum = SpotifyMockAlbums[0];

describe('AlbumDescription Component', () => {
  it('should renders album name', () => {
    render(<AlbumDescription album={mockedAlbum} />);
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

  it('should renders album type', () => {
    render(<AlbumDescription album={mockedAlbum} />);
    expect(screen.getByText('Tipo:')).toBeInTheDocument();
    expect(screen.getByText('album')).toBeInTheDocument();
  });

  it('should renders artists', () => {
    render(<AlbumDescription album={mockedAlbum} />);
    expect(screen.getByText('Artistas:')).toBeInTheDocument();
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
  });

  it('should renders formatted price', () => {
    render(<AlbumDescription album={mockedAlbum} />);
    expect(screen.getByText('Preço:')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument();
  });

  it('should renders formatted release date', () => {
    render(<AlbumDescription album={mockedAlbum} />);
    expect(screen.getByText('Data de Lançamento:')).toBeInTheDocument();
    expect(screen.getByText('01/10/2023')).toBeInTheDocument();
  });

  it('should renders default name when album name is not provided', () => {
    render(<AlbumDescription album={{ ...mockedAlbum, name: '' }} />);
    expect(screen.getByText('Nome do Album')).toBeInTheDocument();
  });

  it('should renders default album type when album type is not provided', () => {
    render(<AlbumDescription album={{ ...mockedAlbum, albumType: '' }} />);
    expect(screen.getByText('ALBUM')).toBeInTheDocument();
  });

  it('should renders default price when album price is not provided', () => {
    render(<AlbumDescription album={{ ...mockedAlbum, value: 0 }} />);
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
  });

  it('should renders default release date when album release date is not provided', () => {
    render(<AlbumDescription album={{ ...mockedAlbum, releaseDate: '' }} />);
    expect(screen.getByText('00/00/0000')).toBeInTheDocument();
  });

});