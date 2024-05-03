import React from 'react';
import styled from "styled-components";
import {B1_600} from "../style/FontStyle";


const Base = styled.header`
  background: ${({ theme }) => theme.colors.white};
  text-align: center;
  width: 100%;
  height: 60px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1136px;
`;

const Logo = styled.img`
  width: 80px;
  height: 60px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 60px;
  flex-shrink: 0;
  padding: 0 10px;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
`;

const HomeLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
`;

const MainHeader = () => {

  const handleSubscribeClick = () => {
    alert('준비 중입니다.');
  };

  return (
    <Base>
      <Navigation>
        <Link href="/">
          <Logo src={'logo/header_logo.svg'}/>
        </Link>
        <MenuList>
          <Menu>
            <HomeLink href="/">
              <B1_600>
                홈
              </B1_600>
            </HomeLink>
          </Menu>
          <Menu>
            <Link>
              <MenuButton onClick={handleSubscribeClick}>
                <B1_600>
                  구독
                </B1_600>
              </MenuButton>
            </Link>
          </Menu>
        </MenuList>
      </Navigation>
    </Base>
  );
};

export default MainHeader;
