import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled"
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

const Base = styled.header`
  background: #ffffff;
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
  background-color: #FFB443;
`;

const Link = styled.a`
  text-decoration: none;
`;

const MainHeader = () => {
    return (
        <Base>
            <Navigation>
                <Link href="/">
                    <Logo src={'logo/header_logo.svg'}/>
                </Link>
                <MenuList>
                    <Menu>
                        <Link href="/">
                            홈
                        </Link>
                    </Menu>
                    <Menu>
                        <Link href="/subscribe">
                            <MenuButton>
                                구독
                            </MenuButton>
                        </Link>
                    </Menu>
                </MenuList>
            </Navigation>
        </Base>
    );
};

export default MainHeader;
