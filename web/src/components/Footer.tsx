import React from 'react';
import styled from "@emotion/styled"

const Base = styled.footer`
  display: block;
  background-color: #ffffff;
  width: 100%;
`;

const Section = styled.section`
  margin: 0 auto;
  width: 1136px;
  height: 172px;
  background-color: #FFB443;
`;

const Container = styled.section`
  text-align: right;
  padding: 16px 40px;
`;

const FooterTitle = styled.div``;
const FooterText = styled.div``;
const FooterIcon = styled.div``;
const FooterLink = styled.div``;

const Footer: React.FC = () => {
    return (
        <Base>
            <Section>
                <Container>
                  <FooterTitle>글조명</FooterTitle>
                  <FooterText>제작: 권오현 / 심화영 / 정승훈</FooterText>
                  <FooterIcon>
                    <img src={'/icons/instagram.svg'}/>
                  </FooterIcon>
                  <FooterLink>개인정보처리방침</FooterLink>
                </Container>
            </Section>
        </Base>
    )
}

export default Footer;