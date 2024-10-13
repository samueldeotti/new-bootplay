import StatsContainer from '../StatsContainer/StatsContainer';
import StatsCard from '../StatsContainer/StatsCard';
import { DollarSignIcon, FileVideoIcon } from 'lucide-react';
import { AlbumModel } from '../../models/AlbumModel';
import { formatValue } from '../../utils/formatValue';

export default function AlbumStats({ userAlbums }: { userAlbums?: AlbumModel[] }) {
  const size = 'w-6 h-6 sm:w-8 sm:h-8 text-white';

  const getSpentAmount = (albums: AlbumModel[]) =>
    albums.reduce((acc, album) => acc + album.value, 0);

  const totalSpent = () => formatValue(userAlbums ? getSpentAmount(userAlbums) : 0);

  return (
    <StatsContainer>
      <StatsCard label="Total de Albums" value={userAlbums?.length || 0}>
        <FileVideoIcon className={size} />
      </StatsCard>

      <StatsCard label="Valor Investido" value={totalSpent()}>
        <DollarSignIcon className={size} />
      </StatsCard>
    </StatsContainer>
  );
}
