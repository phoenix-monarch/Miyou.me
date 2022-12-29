import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link"

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../skeletons/AnimeCardsSkeleton";

import "swiper/css";
import "swiper/css/scrollbar";

function AnimeCards(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // let res = await axios.get(
    //   `${process.env.REACT_APP_BACKEND_URL}api/getmalinfo?criteria=${props.criteria}&count=${props.count}`
    // );
let res ={
  "data": [
      {
          "node": {
              "id": 16498,
              "title": "Shingeki no Kyojin",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/10/47347.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/10/47347l.jpg"
              }
          },
          "ranking": {
              "rank": 1
          }
      },
      {
          "node": {
              "id": 1535,
              "title": "Death Note",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/9/9453.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/9/9453l.jpg"
              }
          },
          "ranking": {
              "rank": 2
          }
      },
      {
          "node": {
              "id": 5114,
              "title": "Fullmetal Alchemist: Brotherhood",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/1208/94745.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/1208/94745l.jpg"
              }
          },
          "ranking": {
              "rank": 3
          }
      },
      {
          "node": {
              "id": 30276,
              "title": "One Punch Man",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/12/76049.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/12/76049l.jpg"
              }
          },
          "ranking": {
              "rank": 4
          }
      },
      {
          "node": {
              "id": 11757,
              "title": "Sword Art Online",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/11/39717.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/11/39717l.jpg"
              }
          },
          "ranking": {
              "rank": 5
          }
      },
      {
          "node": {
              "id": 31964,
              "title": "Boku no Hero Academia",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/10/78745.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/10/78745l.jpg"
              }
          },
          "ranking": {
              "rank": 6
          }
      },
      {
          "node": {
              "id": 38000,
              "title": "Kimetsu no Yaiba",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/1286/99889.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/1286/99889l.jpg"
              }
          },
          "ranking": {
              "rank": 7
          }
      },
      {
          "node": {
              "id": 20,
              "title": "Naruto",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/13/17405.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/13/17405l.jpg"
              }
          },
          "ranking": {
              "rank": 8
          }
      },
      {
          "node": {
              "id": 22319,
              "title": "Tokyo Ghoul",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/5/64449.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/5/64449l.jpg"
              }
          },
          "ranking": {
              "rank": 9
          }
      },
      {
          "node": {
              "id": 11061,
              "title": "Hunter x Hunter (2011)",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/1337/99013.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/1337/99013l.jpg"
              }
          },
          "ranking": {
              "rank": 10
          }
      },
      {
          "node": {
              "id": 32281,
              "title": "Kimi no Na wa.",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/5/87048.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/5/87048l.jpg"
              }
          },
          "ranking": {
              "rank": 11
          }
      },
      {
          "node": {
              "id": 25777,
              "title": "Shingeki no Kyojin Season 2",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/4/84177.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/4/84177l.jpg"
              }
          },
          "ranking": {
              "rank": 12
          }
      },
      {
          "node": {
              "id": 9253,
              "title": "Steins;Gate",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/1935/127974.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/1935/127974l.jpg"
              }
          },
          "ranking": {
              "rank": 13
          }
      },
      {
          "node": {
              "id": 33486,
              "title": "Boku no Hero Academia 2nd Season",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/12/85221.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/12/85221l.jpg"
              }
          },
          "ranking": {
              "rank": 14
          }
      },
      {
          "node": {
              "id": 1735,
              "title": "Naruto: Shippuuden",
              "main_picture": {
                  "medium": "https://api-cdn.myanimelist.net/images/anime/1565/111305.jpg",
                  "large": "https://api-cdn.myanimelist.net/images/anime/1565/111305l.jpg"
              }
          },
          "ranking": {
              "rank": 15
          }
      }
  ],
  "paging": {
      "next": "https://api.myanimelist.net/v2/anime/ranking?offset=15&ranking_type=bypopularity&limit=15&offest=0"
  }
}
    setLoading(false);
    setData(res.data.data);
  }
  return (
    <div>
      {loading && <AnimeCardsSkeleton />}
      {!loading && (
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
          {data.map((item, i) => (
            <SwiperSlide>
              <Wrapper>
                <Link to={"id/" + item.node.id}>
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
