import Image from 'next/image';
import SwiperCore, { A11y, EffectFade, Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/a11y/a11y.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/lazy/lazy.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Navigation, Lazy, EffectFade, A11y]);

export default function Carousel(props) {
  const { images } = props;

  const imageMap = images => {
    return images.map((image, i) => {
      return (
        <SwiperSlide className="bg-gray-200" key={image.url}>
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
      a11y
      className="p-0 m-0 w-full h-full"
      effect="fade"
      navigation
      spaceBetween={30}
      slidesPerView={1}
    >
      {imageMap(images)}
    </Swiper>
  );
}
