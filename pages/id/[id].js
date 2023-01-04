import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr"
import { useRouter } from "next/router";
import { request } from "graphql-request";
import AnimeDetailsSkeleton from "../../components/skeletons/AnimeDetailsSkeleton";
import useWindowSize from "../../hooks/useWindowSize";
import { searchByIdQuery } from "../../hooks/searchQueryStrings";
import { cacheGraphQlFetch } from "../../hooks/cacheRequest";
function MalAnimeDetails() {
  const router = useRouter()
  const {id} =router.query
  const { data : anilistResponse  , error :anilistResponseError,isLoading : anilistResponseLoading   } = useSWR( 
    router.isReady ? 
    [searchByIdQuery, {id: id},`Info:${id}`]
    : null
    ,
    ([query, variables,keyCache]) => cacheGraphQlFetch(query, variables,keyCache)
  )
  const {data : episodeInfo ,error: episodeInfoError,isLoading : episodeInfoLoading} = useSWR(router.isReady ? `/api/getEpisodeInfo/${id}` : null )
  const { width } = useWindowSize();
  const [expanded, setExpanded] = useState(false);
  const [dub, setDub] = useState(false);

  function readMoreHandler() {
    setExpanded(!expanded);
  }
  if(anilistResponseError ){
    return (
    <NotAvailable>
      <h1>Oops! This Anime Is Not Available</h1>
    </NotAvailable>
    )
  }

  if(anilistResponseLoading || episodeInfoLoading  ){
    return(<AnimeDetailsSkeleton /> )
  }
  return (
    <div>
      {!anilistResponseLoading && !episodeInfoLoading  && (
        <Content>
          {anilistResponse !== undefined && (
            <div>
              <Banner
                src={
                  anilistResponse.Media.bannerImage !== null
                    ? anilistResponse.Media.bannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img src={anilistResponse.Media.coverImage.extraLarge} alt="" />
                  {episodeInfo && <Button href={`/play/${episodeInfo.subLink}/1`}>
                    Watch Sub
                  </Button>}
                  {episodeInfo && episodeInfo.isDub && (
                    <Button
                      className="outline"
                      href={`/play/${episodeInfo.dubLink}/1`}
                    >
                      Watch Dub
                    </Button>
                  )}
                </Poster>
                <div>
                  <h1>{anilistResponse.Media.title.userPreferred}</h1>
                  {anilistResponse.Media.title.english != null && (
                    <h3>{"English - " + anilistResponse.Media.title.english}</h3>
                  )}
                  <p>
                    <span>Type: </span>
                    {anilistResponse.Media.type}
                  </p>
                  {width <= 600 && expanded && (
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `<span>Plot Summery: </span>${anilistResponse.Media.description}`,
                        }}
                      ></p>
                      <button onClick={() => readMoreHandler()}>
                        read less
                      </button>
                    </section>
                  )}

                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summery: </span>
                      {anilistResponse.Media.description.substring(0, 200) + "... "}
                      <button onClick={() => readMoreHandler()}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          "<span>Plot Summery: </span>" +
                          anilistResponse.Media.description,
                      }}
                    ></p>
                  )}

                  <p>
                    <span>Genre: </span>
                    {anilistResponse.Media.genres.toString()}
                  </p>
                  <p>
                    <span>Released: </span>
                    {anilistResponse.Media.startDate.year}
                  </p>
                  <p>
                    <span>Status: </span>
                    {anilistResponse.Media.status}
                  </p>
                  {
                    episodeInfo ? <>
                    <p>
                      <span>Number of Sub Episodes: </span>
                      {episodeInfo.subTotalEpisodes}
                    </p>
                    {episodeInfo.isDub && (
                      <p>
                        <span>Number of Dub Episodes: </span>
                        {episodeInfo.dubTotalEpisodes}
                      </p>
                    )}
                    </>
                    : null
                  }
                  
                </div>
              </ContentWrapper>
              {!episodeInfo && (
        <NotAvailable>
          <h1>Oops! This Anime&apos;s Episode Is Not Available</h1>
        </NotAvailable>
      )}
      {episodeInfo && <Episode>
                <DubContainer>
                  <h2>Episodes</h2>
                  {episodeInfo.isDub && (
                    <div class="switch">
                      <label for="switch">
                        <input
                          type="checkbox"
                          id="switch"
                          onChange={(e) => setDub(!dub)}
                        ></input>
                        <span class="indicator"></span>
                        <span class="label">{dub ? "Dub" : "Sub"}</span>
                      </label>
                    </div>
                  )}
                </DubContainer>
                {width > 600 && (
                  <Episodes>
                    {episodeInfo.isDub &&
                      dub &&
                      [...Array(episodeInfo.dubTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                        key={i+1}
                          href={`/play/${episodeInfo.dubLink}/${parseInt(i) + 1}`}
                        >
                          Episode {i + 1}
                        </EpisodeLink>
                      ))}

                    {!dub &&
                      [...Array(episodeInfo.subTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                        key={i+1}
                          href={`/play/${episodeInfo.subLink}/${parseInt(i) + 1}`}
                        >
                          Episode {i + 1}
                        </EpisodeLink>
                      ))}
                  </Episodes>
                )}
                {width <= 600 && (
                  <Episodes>
                    {episodeInfo.isDub &&
                      dub &&
                      [...Array(episodeInfo.dubTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                        key={i+1}
                          href={`/play/${episodeInfo.dubLink}/${parseInt(i) + 1}`}
                        >
                          {i + 1}
                        </EpisodeLink>
                      ))}

                    {!dub &&
                      [...Array(episodeInfo.subTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                        key={i+1}
                          href={`/play/${episodeInfo.subLink}/${parseInt(i) + 1}`}
                        >
                          {i + 1}
                        </EpisodeLink>
                      ))}
                  </Episodes>
                )}
              </Episode>}
              
            </div>
          )}
        </Content>
      )}
    </div>
  );
}

const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 30rem;
  }

  h1 {
    margin-top: -2rem;
    font-weight: normal;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 18rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;

const DubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;

  .switch {
    position: relative;

    label {
      display: flex;
      align-items: center;
      font-family: "Lexend", sans-serif;
      font-weight: 400;
      cursor: pointer;
      margin-bottom: 0.3rem;
    }

    .label {
      margin-bottom: 0.7rem;
      font-weight: 500;
    }

    .indicator {
      position: relative;
      width: 60px;
      height: 30px;
      background: #242235;
      border: 2px solid #393653;
      display: block;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:before {
        width: 22px;
        height: 22px;
        content: "";
        display: block;
        background: #7676ff;
        border-radius: 26px;
        transform: translate(2px, 2px);
        position: relative;
        z-index: 2;
        transition: all 0.5s;
      }
    }
    input {
      visibility: hidden;
      position: absolute;

      &:checked {
        & + .indicator {
          &:before {
            transform: translate(32px, 2px);
          }
          &:after {
            width: 54px;
          }
        }
      }
    }
  }
`;

const Episode = styled.div`
  margin: 0 4rem 0 4rem;
  padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);

  @media screen and (max-width: 600px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 0.3rem;
    font-weight: 500;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    span {
      font-weight: 700;
      color: white;
    }
    p {
      font-weight: 300;
      text-align: justify;
    }
    h1 {
      font-weight: 700;
      color: white;
    }
    h3 {
      font-weight: 500;
    }
    button {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
    }
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2.3rem;
    position: relative;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }

  .outline {
    background-color: transparent;
    border: 2px solid #9792cf;
  }
`;

const Button = styled(Link)`
  font-size: 1.2rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-weight: 700;
  border-radius: 0.4rem;
  position: relative;
  top: -25%;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

export default MalAnimeDetails;
