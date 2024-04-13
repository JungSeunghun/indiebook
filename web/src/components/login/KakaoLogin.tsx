import React from 'react';
import styled from "@emotion/styled";

const KakaoButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const KakaoButtonImg = styled.img`
    width: 100%;
    height: auto;
`;

const KakaoLogin = () => {
    const Rest_api_key = '65e6e748f911c9b54e631e49ae9565cd'
    const redirect_uri = 'http://localhost:3000/auth'
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }
    return (
      <KakaoButton onClick={handleLogin}>
        <KakaoButtonImg src="/kakao/ko/kakao_login_medium_wide.png"/>
      </KakaoButton>
    )
}
export default KakaoLogin
