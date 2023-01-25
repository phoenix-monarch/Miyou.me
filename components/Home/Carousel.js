import styled from "styled-components";
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useWindowSize from "../../hooks/useWindowSize";
function Carousel({ images }) {
  const {height, width   } = useWindowSize();
const router = useRouter()



  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={width <= 600 ? false : true}
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {images.map(
          (item, index) =>
            item.bannerImage !== null && (
              <SwiperSlide key={index}>
                <Container>
                  {width <= 600 && (
                    <img
                      src={item.bannerImage}
                      alt=""
                      style={bannerImageStyleMobile}
                    />
                  )}
                  {width > 600 && (
                    <img src={item.bannerImage} alt="" style={bannerImgStyle} />
                  )}
                  <Wrapper>
                    <Content>
                      {width <= 600 && (
                        <p>
                          {item.title.english !== null
                            ? item.title.english.length > 35
                              ? item.title.english.substring(0, 35) + "..."
                              : item.title.english
                            : item.title.romaji.length > 35
                            ? item.title.romaji.substring(0, 35) + "..."
                            : item.title.romaji}
                        </p>
                      )}
                      {width > 600 && (
                        <p>
                          {item.title.english !== null
                            ? item.title.english
                            : item.title.romaji}
                        </p>
                      )}

                  
                        <IconContext.Provider
                          value={{
                            size: "2rem",
                            style: {
                              verticalAlign: "middle",
                              paddingLeft: "0.2rem",
                            },
                          }}
                        >
                          <Link className="btn-primary btn"
                          // onClick={() =>  router.push(`id/${item.idMal}`)}
                          href={"id/" + item.idMal}
                          >
                            <BsFillPlayFill className="md:h-8 md:w-8" />
                            <div className="hidden md:block">
             Watch 
             </div>
                          </Link>
                        </IconContext.Provider>
                   
                      
                    </Content>
                  </Wrapper>
                </Container>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}

const bannerImgStyle = {
  width: "100%",
  height: "330px",
  objectFit: "cover",
  borderRadius: "0.7rem",
};

const bannerImageStyleMobile = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "0.5rem",
};

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(27, 26, 39, 0) 0%,
    rgba(38, 36, 65, 0.3) 30%,
    rgba(0, 0, 0, 1) 100%
  );
  background-blend-mode: multiply;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    border-radius: 0.5rem;
    background: linear-gradient(
      180deg,
      rgba(27, 26, 39, 0) 0%,
      rgba(38, 36, 65, 0.3) 30%,
      rgba(0, 0, 0, 1) 100%
    );
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 6rem 2.3rem 0 2.3rem;

  p {
    font-weight: 600;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    align-items: flex-start;
    margin: 3rem 1.3rem 0 1.3rem;
    p {
      margin-top: 0.5rem;
      font-size: 1.4rem;
    }
  }
`;

const Button = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
  background-color: #7676ff;
  outline: none;
  border: none;
  padding: 0.75rem 1.3rem 0.75rem 1.3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;

  @media screen and (max-width: 600px) {
    border-radius: 50%;
    padding: 1.1rem;
    margin-top: 2.8rem;
  }
`;

export default Carousel;
