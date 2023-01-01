import styled from "styled-components";
import Image from "next/image"
import Image404 from "../assets/404.png"
function PageNotFound() {

  return (
    <div>
        <NotAvailable>
          <Image id="PageNotFoundImage"  src={Image404} alt="404" />
          <h1>Oops! This Page Is Not Available</h1>
        </NotAvailable>
      
     
     </div>
  );
}

const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  #PageNotFoundImage {
    width: 30rem;
    height:410px;
  }

  h1 {
    margin-top: -2rem;
    font-weight: normal;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    #PageNotFoundImage {
      width: 18rem;
      height: 247px;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;





export default PageNotFound;
