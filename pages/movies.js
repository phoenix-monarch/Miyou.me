import useSWR from "swr"
import Link from "next/link";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
import { cacheFetchRequest } from "../hooks/cacheRequest";

function PopularMovie() {
  

  const { data , error } = useSWR([`${process.env.NEXT_PUBLIC_BACKEND_URL}api/getmalinfo?criteria=movie&count=100`,`Popular Movies`] , ([url,cacheKey]) => cacheFetchRequest(url,cacheKey))

  if(error) return <div>Failed To Load {console.log(error)}</div>
  return (
    <div>
      {!data && <SearchResultsSkeleton name="Popular Movie" />}
      {data && (
        <Parent>
          <Heading>
            <span>Popular Movie</span> Results
          </Heading>
          <CardWrapper>
{data.data.map((item, i) => (
              <Links key={item.node.id} href={"/id/" + item.node.id}>
                <img src={item.node.main_picture.large} alt="" />
                <p>{item.node.title}</p>
              </Links>
            ))}
          </CardWrapper>
         
        </Parent>
      )}
      
    </div>
  );
}


const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }
`;

const Links = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

export default PopularMovie;
