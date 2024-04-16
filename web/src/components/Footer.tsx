import React from 'react';
import styled from "@emotion/styled"
import {B1_600, B2_400} from "../style/Style";

const Base = styled.footer`
  display: block;
  background-color: #ffffff;
  width: 100%;
`;

const Section = styled.section`
  margin: 0 auto;
  max-width: 1136px;
  height: 172px;
  background-color: #FFB443;
`;

const Container = styled.section`
  text-align: right;
  padding: 16px 40px;
`;

const FooterTitle = styled(B1_600)`
`;

const FooterText = styled(B2_400)`
`;

const FooterIcon = styled.div`
  margin: 16px 0;
`;
const Link = styled.a`
  color: #000000;
`;

const Footer: React.FC = () => {
  return (
    <Base>
      <Section>
        <Container>
          <FooterTitle>글조명</FooterTitle>
          <FooterText>제작: 권오현 / 심화영 / 정승훈</FooterText>
          <Link href={'https://www.instagram.com/writing.lighting?igsh=c2RmM3V6eHpuNGc2&utm_source=qr'}
                target={'_blank'}>
            <FooterIcon>
              <img src={'/icons/instagram.svg'}/>
            </FooterIcon>
          </Link>
          <Link>
            <FooterText>개인정보처리방침</FooterText>
          </Link>
        </Container>
      </Section>
    </Base>
  )
}

export default Footer;