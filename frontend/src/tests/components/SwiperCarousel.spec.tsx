import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { vi } from 'vitest';
import { SpotifyMockAlbums } from '../mocks/AlbumMock';
import { SpotifyAlbumModel } from '../../models/AlbumModel';
import SwiperCarousel from '../../components/SwiperCarousel';


const mockItems: SpotifyAlbumModel[] = SpotifyMockAlbums;

describe('SwiperCarousel Component', () => {
  it('should renders all albums', () => {
    render(<SwiperCarousel items={mockItems} setIsModalOpen={vi.fn()} setSelectedAlbum={vi.fn()} />);
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('should opens modal and sets selected album on album click', () => {
    const setIsModalOpen = vi.fn();
    const setSelectedAlbum = vi.fn();
    render(<SwiperCarousel items={mockItems} setIsModalOpen={setIsModalOpen} setSelectedAlbum={setSelectedAlbum} />);

    fireEvent.click(screen.getByText(mockItems[0].name));
    expect(setIsModalOpen).toHaveBeenCalledWith(true);
    expect(setSelectedAlbum).toHaveBeenCalledWith(mockItems[0]);
  });

});
