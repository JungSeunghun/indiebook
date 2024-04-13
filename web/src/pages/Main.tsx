import React from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import styled from "@emotion/styled";
import KakaoLogin from "../components/login/KakaoLogin";

const Main = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 72px;
`;

const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
        <Main>
          <KakaoLogin/>
        </Main>
      <Footer />
    </div>
  );
};

export default MainPage;
