import { SpotifyAlbumModel } from '../../models/AlbumModel';

export function Description({ label, value }: { label: string; value: number | string }) {
  return (
    <p className='overflow-hidden whitespace-nowrap h-6 sm:h-6 max-w-[202px] sm:max-w-[260px] text-ellipsis'>
      <span className='font-semibold'>{label}</span> {value}
    </p>
  );
}

export default function AlbumDescription({ album }: { album: SpotifyAlbumModel }) {
  const artists = () => {
    return album?.artists
      .reduce((acc, artist) => acc + artist.name + ', ', '')
      .slice(0, -2);
  };

  const getDate = () => {
    const splittedDate = album?.releaseDate?.split('-');

    return splittedDate
      ?.filter((date) => date)
      .reverse()
      .join('/') || '00/00/0000';
  };

  const formatValue = (value: number) => value?.toFixed(2)?.replace('.', ',');

  return (
    <div className="flex flex-col gap-2 sm:gap-0 sm:w-full sm:py-4 bg-transparent items-center justify-between sm:relative text-black mb-4 sm:mb-0">
      <p className="text-lg sm:text-2xl sm:w-4/5 font-bold text-center overflow-hidden line-clamp-2 sm:line-clamp-2 sm:max-h-16">
        {album?.name || 'Nome do Album'}
      </p>

      <div className="flex flex-col text-xs gap-2 sm:gap-3 sm:text-sm w-full self-start mt-2 sm:mt-8 px-2">
        <Description label="Tipo:" value={album?.albumType || 'ALBUM'} />
        <Description label="Artistas:" value={artists()} />
        <Description label="Preço:" value={`R$ ${formatValue(album?.value || 0)}`} />
        <Description label="Data de Lançamento:" value={getDate()} />
      </div>
    </div>
  );
}
