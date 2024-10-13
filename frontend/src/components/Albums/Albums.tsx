import { AlbumModel, SpotifyAlbumModel } from '../../models/AlbumModel';
import Album from './Album';

export default function Albums({ albums, isFromSpotify }: {
  albums: AlbumModel[] | SpotifyAlbumModel[], 
  isFromSpotify?: boolean 
}) {
  return (
    <section className="grid grid-cols-2 h-full gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mb-8">
      {albums?.map((album) => (
        <Album key={album.id} album={album} isFromSpotify={isFromSpotify} />
      ))}
    </section>
  );
}
