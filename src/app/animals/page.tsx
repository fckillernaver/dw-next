"use client";
import useAnimals from "@/hooks/useAnimals";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AnimalPage = () => {
  const { fetch, isLoaded } = useAnimals();
  const [data, setData] = useState<DJAnimal[]>([]);
  const swiper = useSwiper();
  useEffect(() => {
    fetch().then(setData);
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>
          <CgSpinner />
        </h1>
      ) : (
        <div>
          {/* <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(s) => console.log(s)}
            style={{
              border: "1px solid",
              height: 500,
            }}
          >
            {data.map((item, i) => (
              //   <div key={i}>
              <SwiperSlide key={i}>
                <Image
                  src={item.imgUrl}
                  width={200}
                  height={200}
                  alt={item.sort}
                />
              </SwiperSlide>
              //   </div>
            ))}
          </Swiper> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={item.imgUrl}
                  width={200}
                  height={200}
                  alt={item.sort}
                  style={{ width: "100%", height: "auto" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={() => fetch()}>FETCH AGAIN</button>
          <button onClick={() => swiper.slideNext()}>Next</button>
          <button onClick={() => swiper.slidePrev()}>Prev</button>
        </div>
      )}
    </div>
  );
};

export default AnimalPage;
