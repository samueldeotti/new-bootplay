import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SpotifyAlbumModel } from '../../models/AlbumModel';
import Albums from '../../components/Albums/Albums';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';
import { api } from '../../services/apiService';

import MainContainer from '../../components/MainContainer/MainContainer';
import Background from '../../components/Background/Background';
// import BlurContainer from '../../components/BlurContainer/BlurContainer';
import Title from '../../components/Title/Title';
import axios, { AxiosError } from 'axios';
import SwiperCarousel from '../../components/SwiperCarousel';
import AlbumModal from '../../components/AlbumModal/AlbumModal';
import BlurContainer from '../../components/BlurContainer/BlurContainer';

export function Dashboard() {
  window.document.title = 'Dashboard';

  const [startAlbums, setStartAlbums] = useState<SpotifyAlbumModel[]>([]);
  const [albums, setAlbums] = useState<SpotifyAlbumModel[]>([]);
  const [search, setSearch] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbumModel>();

  const getData = async (searhInput: string, isFirstCall: boolean) => {
    try {
      setLoading(true);
      const resp = await api.get(`/albums/all?search=${searhInput}`)

      if (isFirstCall || search === '') {
        setStartAlbums(resp.data);
        return;
      }
      setAlbums(resp.data);
      setIsInputEmpty(false);
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (!axios.isAxiosError(errors)) {
        toast.error('Erro ao buscar albums');
      }
      toast.error('Erro ao buscar albums');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData('Rock', true);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) {
      setIsInputEmpty(true);
      return;
    }
    getData(search, false);
  };

  return (
    <>
      <Background bgImage='dashboard' className='h-[440px] sm:h-[550px] lg:h-[640px] relative' childClassName='h-full sm:gap-10'>
        <div className="flex flex-col self-start ml-2 sm:ml-4 md:ml-6 lg:ml-10 gap-2 text-white w-4/5 absolute bottom-16 sm:bottom-24 max-w-[560px]">
          <Title className="sm:w-5/6">
            A história da música não pode ser esquecida!
          </Title>
          <p className="text-xl w-4/5 sm:text-2xl font-comicNeue">Sucessos que marcaram o tempo!!!</p>
        </div>
      <BlurContainer />
      </Background>
      <MainContainer className='my-4 gap-4 mb-4 overflow-hidden'>
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />

        {isInputEmpty && (<Title className='self-start text-white'>Trends</Title>)}
        {loading && <Loader size={64} />}

        {modalIsOpen && (
          <AlbumModal
            album={selectedAlbum as SpotifyAlbumModel}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
          />
        )}

        {!loading && (
          isInputEmpty
            ? (
              <div className='relative mb-8'>
                <SwiperCarousel items={startAlbums} setSelectedAlbum={setSelectedAlbum} setIsModalOpen={setModalIsOpen} />
              </div>
            ) : <Albums albums={albums} isFromSpotify />
        )}
      </MainContainer>
    </>
  );
}
