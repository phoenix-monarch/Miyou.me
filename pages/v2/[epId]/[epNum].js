import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import styled from "styled-components";
import { BiArrowToBottom, BiFullscreen } from "react-icons/bi";
import useSWR from "swr"
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import { IconContext } from "react-icons";
import WatchAnimeSkeleton from "../../../components/skeletons/WatchAnimeSkeleton";
import useWindowSize from "../../../hooks/useWindowSize";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";

import { cacheFetchRequest } from "../../../hooks/cacheRequest";
import toast from "react-hot-toast";
import Head from "next/head";
// import Test from "../../../components/test"

function WatchAnimeV2() {
  const router = useRouter();
  const {epId,epNum} = router.query
  const { width } = useWindowSize();
const [dub,setDub]= useState(false)
const [dubAvailable,setDubAvailable] =useState(true)
  const { data : epIframeData , error :epIframeError } = useSWR( router.isReady ? `/api/tenshi/getEpIframe/${epId}/${epNum}` : null)
  const {data,error} = useSWR(epIframeData  ? ( dub ? ( epIframeData.Source.Dub[0] ? `/api/tenshi/getEpisodeSources/${epId}/${epIframeData.Source.Dub[0].episodeId}/${epNum}` : null) : `/api/tenshi/getEpisodeSources/${epId}/${epIframeData.Source.Sub[0].episodeId}/${epNum}` ) : null)
 
  useEffect(() => {
    function isObjectEmpty(obj) {
      return Object.keys(epIframeData.Source.Dub).length === 0;
  }
  if(isObjectEmpty){
    setDubAvailable(false)
  }
  else{
    setDubAvailable(true)
  }
    
  }, [epIframeData])
  
  if (!epIframeError && epIframeData) {
    
    // updateLocalStorage(
    //     epIframeData.animeId,
    //     epIframeData.episodeNum,
    //     epIframeData.mal_id,
    //     epIframeData.isDub
    //   );
   
    <Head>
        <title>{data && epIframeData.Name }</title>
      </Head>
  }
 
 

  function updateLocalStorage(animeId, epNum, malId, isDub) {
    if(typeof window !== "undefined"){
    if (localStorage.getItem("Watching")) {
      let data = localStorage.getItem("Watching");
      data = JSON.parse(data);
      let index = epIframeData.findIndex((i) => i.animeId === animeId);
      if (index !== -1) {
        epIframeData.splice(index, 1);
      }
      epIframeData.unshift({
        animeId,
        epNum,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Watching", data);
    } else {
      let data = [];
      epIframeData.push({
        animeId,
        epNum,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      
      localStorage.setItem("Watching", data);
    }
  }
  }
  // fetch("https://suzaku.tenshi.moe/1dd5ed64586e51ac?download_token=a196839bfb8263de192a3a38832843c634cf77949c3384fe0947ce1e48d40195", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-US,en;q=0.9",
  //     "if-modified-since": "Sat, 29 Oct 2022 18:39:35 GMT",
  //     "if-none-match": "\"635d7367-213152e7\"",
  //     "range": "bytes=0-15858",
  //     "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"Windows\"",
  //     "sec-fetch-dest": "video",
  //     "sec-fetch-mode": "no-cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://tenshi.moe/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "method": "GET",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

// s
  return (
    <div>
      {!epIframeData && <WatchAnimeSkeleton />}
      {epIframeData && data && (
        <Wrapper>
          {epIframeData   && (
            <div>
              <div>
                <Titles>
                  <p>
                    <span>{epIframeData.Name}</span>
                    
                  </p>
                </Titles>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#b5c3de",
                    fontWeight: 300,
                  }}
                >
                  If the video player doesn&apos;t load or if blank refresh the page
                </p>
              </div>

              <VideoPlayerWrapper>
                <div>
                  
                
                    <div>
                    <VideoPlayer
                      sources={data.sources}
                      type={"mp4"}
                      previewThumbnails={data.previewThumbnails}
                      dub={dub}
                      dubAvailable={dubAvailable}
                      setDub={setDub}
                      server="tenshi"
                      title={`${epIframeData.Name}`}
                      totalEpisodes={epIframeData.TotalEp}
                      currentEpisode={epNum}
                    />
                    </div>
                  
                  <EpisodeButtons>
                   
                      <IconContext.Provider
                        value={{
                          size: "1.8rem",
                          style: {
                            verticalAlign: "middle",
                          },
                        }}
                      >
                        <EpisodeLinks
                          href={`/v2/${epIframeData.animeId}/${
                            parseInt(epNum) + 1
                          }`}
                          style={
                            parseInt(epNum) ===
                            parseInt(epIframeData.TotalEp)
                              ? {
                                  pointerEvents: "none",
                                  color: "rgba(255,255,255, 0.2)",
                                }
                              : {}
                          }
                        >

                          <HiArrowSmRight />
                         <div className="hidden md:block">
                           Previous
                          </div>
                        </EpisodeLinks>
                      </IconContext.Provider>
                    
                 
                      <IconContext.Provider
                        value={{
                          size: "1.3rem",
                          style: {
                            verticalAlign: "middle",
                            marginBottom: "0.2rem",
                            marginLeft: "0.3rem",
                          },
                        }}
                      >
                        <EpisodeLinks
                        className="flex justify-center items-center"
                          href={`/v1/${epIframeData.animeId}/${
                            parseInt(epNum) + 1
                          }`}
                          style={
                            parseInt(epNum) ===
                            parseInt(epIframeData.TotalEp)
                              ? {
                                  pointerEvents: "none",
                                  color: "rgba(255,255,255, 0.2)",
                                }
                              : {}
                          }
                        >
                          <div className="hidden md:block">

                          Next
                          </div>

                          <HiArrowSmRight />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    
                  </EpisodeButtons>
                </div>
                <EpisodesWrapper>
                  <p>Episodes</p>
                  <Episodes>
                    {[...Array(parseInt(epIframeData.TotalEp))].map(
                      (x, i) => (
                        <EpisodeLink
                        key={i+1}
                          href={`/v2/${epId}/${
                            parseInt(i) + 1
                          }`}
                          style={
                            i + 1 <= parseInt(epNum)
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                        >
                          {i + 1}
                        </EpisodeLink>
                      )
                    )}
                  </Episodes>
                </EpisodesWrapper>
              </VideoPlayerWrapper>
            </div>
          )}
        </Wrapper>
      )}
    </div>
  );
}

const VideoPlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 70% calc(30% - 1rem);
  gap: 1rem;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242235;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #393653;
  border-bottom: none;
  margin-top: 1rem;
  font-weight: 400;
  p {
    color: white;
  }

  button {
    outline: none;
    border: none;
    background: transparent;
    margin-left: 1rem;
    cursor: pointer;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.6);
  background-image: url("https://i.ibb.co/28yS92Z/If-the-video-does-not-load-please-refresh-the-page.png");
  background-size: 23rem;
  background-repeat: no-repeat;
  background-position: center;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    z-index: 10;
    padding: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding-bottom: 66.3%;
    background-size: 13rem;
  }
`;

const EpisodesWrapper = styled.div`
  margin-top: 1rem;
  border: 1px solid #272639;
  border-radius: 0.4rem;
  padding: 1rem;

  p {
    font-size: 1.3rem;
    text-decoration: underline;
    color: white;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  /* box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81); */
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  grid-gap: 0.8rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.6rem 0.8rem;
  font-weight: 400;
  border-radius: 0.3rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }
`;

const ServerWrapper = styled.div`
  p {
    color: white;
    font-size: 1.4rem;
    font-weight: 400;
    text-decoration: underline;
  }

  .server-wrapper {
    padding: 1rem;
    background-color: #1a1927;
    border: 1px solid #272639;
    border-radius: 0.4rem;
    box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);
  }

  .serverlinks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    grid-gap: 1rem;
    grid-row-gap: 1rem;
    justify-content: space-between;
    margin-top: 1rem;
  }

  button {
    cursor: pointer;
    outline: none;
    color: white;
    background-color: #242235;
    border: 1px solid #393653;
    padding: 0.7rem 1.5rem;
    border-radius: 0.4rem;
    font-weight: 400;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 600px) {
    p {
      font-size: 1.2rem;
    }
  }
`;

const Wrapper = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const EpisodeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EpisodeLinks = styled(Link)`
  color: white;
  padding: 0.6rem 1rem;
  background-color: #242235;
  border: 1px solid #393653;
  text-decoration: none;
  font-weight: 400;
  border-radius: 0.4rem;

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 50%;
  }
`;

const Titles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;
  p {
    font-size: 1.7rem;
    font-weight: 200;
  }

  span {
    font-weight: 600;
  }

  a {
    font-weight: 400;
    background-color: #242235;
    border: 1px solid #393653;
    text-decoration: none;
    color: white;
    padding: 0.7rem 1.1rem 0.7rem 1.5rem;
    border-radius: 0.4rem;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
    p {
      font-size: 1.3rem;
    }
    a {
      padding: 0.7rem;
      border-radius: 50%;
      margin-left: 1rem;
    }
  }
`;

export default WatchAnimeV2;
