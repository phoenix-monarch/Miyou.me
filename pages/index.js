import styled from "styled-components";
import Link from "next/link"
import Carousel from "../components/Home/Carousel";
import useSWR from "swr"
import AnimeCards from "../components/Home/AnimeCards";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";
import WatchingEpisodes from "../components/Home/WatchingEpisodes";
import { TrendingAnimeQuery } from "../hooks/searchQueryStrings";
import {cacheGraphQlFetch} from "../hooks/cacheRequest"
import useWindowSize from "../hooks/useWindowSize";
import { Fragment } from 'react';
function Home() {
  const {width, height} = useWindowSize()

  const { data  , error   } = useSWR( 
    [TrendingAnimeQuery, {page: 1, perPage :15},"TrendingAnimeSlider"]
    ,
    ([query, variables,keyCache]) => cacheGraphQlFetch(query, variables,keyCache)
  )
  
  function checkSize() {
    if (typeof window !== "undefined") {

      let lsData = localStorage.getItem("Watching");
    
    lsData = JSON.parse(lsData);
    if (lsData.length === 0) {
      return false;
    
    }
      return true;
    
  }
  }  if(error) return <>Failed To Load. {console.log(error)} </>

  return (
    
    <div>
      <HomeDiv>
        <HomeHeading>
          <span>Recommended</span> to you
        </HomeHeading>

        {!data  && <HomeSkeleton />}
        {data  && <Carousel images={data.Page.media} />}

        {typeof window !== "undefined"?
            localStorage.getItem("Watching") && checkSize() && (
             <div>
              <HeadingWrapper>
              <Heading>
                  <span>Continue</span> Watching
              </Heading>
               </HeadingWrapper>
    <WatchingEpisodes />
             </div>
           ) 
           : null
            }
    
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Trending</span> Now
            </Heading>
            <Links href="/trending/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="airing" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links href="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="bypopularity" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Top 100</span> Anime
            </Heading>
            <Links href="/top100/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="all" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Favourite
            </Heading>
            <Links href="/favourites/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="favorite" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Popular</span> Movies
            </Heading>
            <Links href="/movies">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="movie" />
        </div>
      </HomeDiv>
    </div>
  );
}

const Links = styled(Link)`
  color: white;
  font-size: 1.1rem;
  font-family: "Gilroy-Medium", sans-serif;
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

const HomeHeading = styled.p`
  font-size: 2.3rem;
  color: white;
  font-weight: 200;

  span {
    font-weight: 600;
  }
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-top: 1rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

export default Home;
