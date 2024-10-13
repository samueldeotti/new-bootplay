import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AlbumModel, ApiAlbumModel } from '../../models/AlbumModel';
import Albums from '../../components/Albums/Albums';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../hooks/UseAuth';
import { api } from '../../services/apiService';
import MainContainer from '../../components/MainContainer/MainContainer';
import Title from '../../components/Title/Title';
import AlbumStats from '../../components/AlbumStats/AlbumStats';

export default function UserAlbums() {
  window.document.title = 'Meus Discos';

  const { id } = useAuth();

  const [userAlbums, setUserAlbums] = useState<AlbumModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const collectionAlbumToAlbum = (albums: ApiAlbumModel[]) => {
    return albums.map((album) => {
      return {
        id: album.id,
        name: album.name,
        value: album.value,
        spotifyUrl: album.spotify_url,
        imageUrl: album.image_url,
        artistName: album.artist_name,
        deletedAt: album.deleted_at,
      };
    }).filter((album) => !album.deletedAt);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resp = await api.get(`/albums/my-collection/${id}`);
        const albums = collectionAlbumToAlbum(resp.data);
        setUserAlbums(albums as AlbumModel[]);
      } catch {
        toast.error('Erro ao buscar albums');

      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return (
    <>
      <MainContainer className='sm:m-auto gap-12 mt-14 sm:mt-28'>
        <Title className="text-white text-4xl">Meus Discos</Title>

        <AlbumStats userAlbums={userAlbums} />

        {loading && <Loader />}
        {!loading &&
          (
            userAlbums.length === 0 ? (
              <p className="text-white w-full text-3xl p-4 rounded-xl">
                Você não possui nenhum disco
              </p>
            ) : (
              <Albums albums={userAlbums} />
            )
          )}
      </MainContainer>
    </>
  );
}
