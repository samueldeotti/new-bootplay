import toast from 'react-hot-toast';
import AlbumDescription from './AlbumDescription';
import { useState } from 'react';
import { SpotifyAlbumModel } from '../../models/AlbumModel';
import { api } from '../../services/apiService';
import { useAuth } from '../../hooks/UseAuth';
import Modal from '../Modal/Modal';
import { Button } from '../Button/button';
import Loader from '../Loader/Loader';
import axios, { AxiosError } from 'axios';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

interface AlbumModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  album: SpotifyAlbumModel;
}

export default function AlbumModal({ isOpen, setIsOpen, album }: AlbumModalProps) {
  const { id } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setLoading(true);

      const requestBody = {
        album: {
          albumType: album.albumType || "ALBUM",
          artists: (album.artists ?? []).map(artist => ({
            externalUrls: {
              externalUrls: {
                spotify: artist.externalUrls.externalUrls.spotify || "string"
              }
            },
            href: artist.href,
            id: artist.id,
            name: artist.name,
            type: artist.type,
            uri: artist.uri
          })),
          externalUrls: {
            externalUrls: {
              spotify: album.externalUrls?.externalUrls?.spotify || "string"
            }
          },
          id: album.id || "string",
          images: (album.images ?? []).map(image => ({
            height: image.height ?? 0,
            url: image.url ?? '',
            width: image.width ?? 0
          })),
          name: album.name || "string",
          releaseDate: album.releaseDate || "string",
          type: album.type || "ALBUM",
          value: album.value ?? 0
        },
        user_id: id
      };

      await api.post("/albums/sale", requestBody);
      toast.success('Album comprado com sucesso');
    } catch (error) {
      const err = error as Error | AxiosError;
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
        if (err.response?.data.message === 'Wallet does not have funds to complete the transaction!') {
          toast.error('Saldo insuficiente');
          return;
        }
        if (err.response?.data.message === 'The album entered already belongs to the user') {
          toast.error('Você já possui esse álbum');
          return;
        }
      }
      toast.error('Algo deu errado');
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <img
          src={album?.images[0]?.url}
          alt="Album cover"
          className="rounded-t-2xl h-full sm:rounded-s-2xl sm:rounded-none sm:w-1/2"
        />
        <div className='sm:w-1/2 flex flex-col h-full justify-around p-3 m-auto w-full font-poppins'>
          <AlbumDescription album={album} />
          <Button
            type="button"
            disabled={loading}
            onClick={handleBuy}
            data-testid="buy-button"
            className={`text-white w-full sm:w-full m-auto rounded-full bg-buttonModal hover:bg-buttonModalHover font-bold focus:outline-2 focus:outline focus:outline-buttonModalHover self-end ${loading && 'cursor-not-allowed'}`}
            autoFocus
          >
            {loading ? <Loader /> : 'Comprar'}
          </Button>
        </div>
      </Modal>
    )
  );
}
