import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link"
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../skeletons/AnimeCardsSkeleton";
import useSWR from "swr"
import "swiper/css";
import "swiper/css/scrollbar";
import {cacheFetchRequest } from "../../hooks/cacheRequest"
function AnimeCards(props) {
  const { data , error } = useSWR([`${process.env.NEXT_PUBLIC_BACKEND_URL}api/getmalinfo?criteria=${props.criteria}&count=${props.count}`,`Criteria:${props.criteria}count:${props.count}`], ([url,cacheKey]) => cacheFetchRequest(url,cacheKey))
  if(error) return <>Failed To Load ... Check console for error {console.log(error)}</>
  return (
    <div>
      {!data && <AnimeCardsSkeleton />}
      {data && (
        <Swiper
          slidesPerView={7}
          spaceBetween={35}
          scrollbar={{
            hide: false,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
              spaceBetween: 35,
            },
            "@1.30": {
              slidesPerView: 5,
              spaceBetween: 35,
            },
            "@1.50": {
              slidesPerView: 7,
              spaceBetween: 35,
            },
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {data.data.map((item, i) => (
            <SwiperSlide key={i}>
              <Wrapper>
                <Link href={"id/" + item.node.id}>
                  <img src={item.node.main_picture.large} alt="" />
                </Link>
                <p>{item.node.title}</p>
              </Wrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export default AnimeCards;
