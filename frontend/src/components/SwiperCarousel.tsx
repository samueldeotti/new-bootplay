import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SpotifyAlbumModel } from '../models/AlbumModel';
import Album from './Albums/Album';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

export default function SwiperCarousel({ items, setIsModalOpen, setSelectedAlbum }: {
  items: SpotifyAlbumModel[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedAlbum: React.Dispatch<React.SetStateAction<SpotifyAlbumModel | undefined>>
}) {

  const [slidePerView, setSlidePerView] = useState(4);

  useEffect(() => {
    const handlResize = () => {
      const width = window.innerWidth;

      if (width >= 1100) {
        setSlidePerView(4);
      } else if (width >= 940) {
        setSlidePerView(3);
      } else if (width >= 860) {
        setSlidePerView(2);
      } else if (width >= 540) {
        setSlidePerView(1);
      }
    };
    handlResize();

    window.addEventListener("resize", handlResize);

    return () => {
      window.removeEventListener("resize", handlResize);
    };
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      autoplay={{ delay: 1500 }}
      loop={true}
      speed={1000}
      slidesPerView={slidePerView}
    >
      {items?.map((item, index) => (
        <SwiperSlide key={index} className='max-w-60' onClick={
          () => {
            setIsModalOpen(true);
            setSelectedAlbum(item);
          }
        } data-testid={`caroulsel-item-${index}`}>
          <Album album={item} key={item.id} isFromSpotify />
        </SwiperSlide>
      ))}

    </Swiper>
  );

}

