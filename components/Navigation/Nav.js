import React, { useState,useEffect } from "react";
import Link from "next/link"
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons";
import useWindowSize from "../../hooks/useWindowSize"
import Search from "./Search";
import Logo from "../../assets/logo.svg"
import Image from "next/image";
function Nav() {
  const [isActive, setIsActive] = useState(false);
  // const [height, width   ] = useWindowSize();
  const {height,width} = useWindowSize()
  


  return (
    <div>
      <NavBar>
        <Link href="/">
          <Image src={Logo} alt="Logo Here" />
        </Link>
        <div className="nav-links">
          <Links href="/trending/1">Trending</Links>
          <Links href="/popular/1">Popular</Links>
          <Links href="/favourites/1">Favourites</Links>
          <Links href="/movies">Top Movies</Links>
        </div>
      

          <IconContext.Provider
            value={{
              size: "1.5rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <button className="btn bg-transparent  md:bg-primary" onClick={(e) => setIsActive(!isActive)}>
              <FiSearch className="md:h-4 md:w-4" />
             <div className="hidden md:block">
             Search
             </div>

            </button>
          </IconContext.Provider>
         
       
      </NavBar>
      {isActive && <Search isActive={isActive} setIsActive={setIsActive} />}
      {isActive && <Shadow></Shadow>}
    </div>
  );
}

const Shadow = styled.div`
  z-index: 9;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 98.6vw;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

const Button = styled.button`
  color: white;
  font-family: "Lexend", sans-serif;
  font-weight: 500;
  background-color: #7676ff;
  outline: none;
  border: none;
  padding: 0.7rem 1.6rem 0.7rem 1.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  FiSearch {
    font-size: 1rem;
  }
  white-space: nowrap;
  @media screen and (max-width: 600px) {
    padding: 0.5rem;
    padding-right: 0;
    background-color: transparent;
  }
`;

const Links = styled(Link)`
  color: white;
  :hover {
    color :grey;
  }
  font-weight: 400;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.8rem 5rem 0 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 2rem;
    margin-top: 1rem;
    img {
      height: 1.7rem;
    }
    .nav-links {
      display: none;
    }
  }
`;

export default Nav;



