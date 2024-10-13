import { AlbumModel, SpotifyAlbumModel } from '../../models/AlbumModel';

export default function Album({ album, isFromSpotify }: {
  album: AlbumModel | SpotifyAlbumModel, 
  isFromSpotify?: boolean,
}) {
  const formatValue = (value: number) => value?.toFixed(2).replace('.', ',')

  return (
    <div
      className="bg-cover bg-no-repeat aspect-square rounded-md font-comicNeue"
      style={{
        backgroundImage: `url(${isFromSpotify && 'images' in album ? album.images[0]?.url : 'imageUrl' in album ? album.imageUrl : ''})`,
        boxShadow: '0 6px 12px rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        className="flex h-full justify-center items-center backdrop-brightness-50 rounded-md cursor-pointer relative text-white"
      >
        <p className="text-lg w-4/5 sm:text-2xl font-semibold text-center overflow-hidden line-clamp-2 sm:line-clamp-3 sm:leading-[2rem]">
          {album.name}
        </p>
        <p className="text-lg font-semibold sm:text-2xl absolute bottom-2 right-4">
          R$ {formatValue(album.value)}
        </p>
      </div>
    </div>
  );
}
