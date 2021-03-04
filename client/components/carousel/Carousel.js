import Image from 'next/image';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation]);

export default function Carousel(props) {
  const { images } = props;

  const imageMap = images => {
    return images.map((image, i) => {
      return (
        <SwiperSlide key={image.url}>
          <Image
            layout="fill"
            objectFit="cover"
            quality={85}
            priority={i < 1 ? true : false}
            src={image.url}
            alt={image.altText ? image.altText : `Image of room ${i + 1}`}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      className="p-0 m-0 w-full h-full"
      navigation
      spaceBetween={5}
      slidesPerView={1}
    >
      {imageMap(images)}
    </Swiper>
  );
}
