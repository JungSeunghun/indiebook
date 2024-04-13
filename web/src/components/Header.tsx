import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled"
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

const Base = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ isScrolled }) => (isScrolled ? 'rgb(255, 255, 255)' : 'transparent')};
  transition: background-color 0.3s;
  text-align: center;
  width: 100%;
  height: 72px;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: block;
    background: rgb(255, 255, 255);
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 20px;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuListWrapper = styled.div<{ isOpen: boolean }>`
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 72px;
    right: 0;
    background: white;
    width: 100%;

    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
    transition: opacity 0.3s, max-height 0.3s ease-out, visibility 0.3s linear;
    overflow: hidden;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ResponsiveMenu = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  flex-shrink: 0;
  padding: 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(ResponsiveMenu)`
  @media (max-width: 768px) {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  margin-right: 24px;
`;

const LogoText = styled.h1<{ isScrolled: boolean }>`
  font-size: 2em;
  font-weight: 700;
  color: ${({ isScrolled }) => (isScrolled ? '#2b2b2b' : '#2b2b2b')};
  @media (max-width: 768px) {
    color: #84b9ff;
    font-size: 1.5em;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  flex-shrink: 0;
  padding: 0 10px;
`;

const MenuButton = styled.button<{ isScrolled: boolean }>`
  font-size: 15px;
  cursor: pointer;
  border: none;
  background: none;
  color: ${({ isScrolled }) => (isScrolled ? '#2b2b2b' : '#2b2b2b')};
  @media (max-width: 768px) {
    color: #2b2b2b;
  }
`;

const SignUpMenuButton = styled.button<{ isScrolled: boolean }>`
  font-size: 15px;
  cursor: pointer;
  border: ${({ isScrolled }) => (isScrolled ? '1px solid #2b2b2b' : '1px solid #2b2b2b')};;
  border-radius: 5px;
  background: none;
  color: ${({ isScrolled }) => (isScrolled ? '#2b2b2b' : '#2b2b2b')};
  @media (max-width: 768px) {
    color: #2b2b2b;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 5px 0px 0px 5px;
`;

const SearchButton = styled.button`
  background: white;
  color: black;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
  height: 37px;
`;

const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Base isScrolled={isScrolled}>
            <Navigation>
                <Logo>
                    <Link href="/">
                        <LogoText isScrolled={isScrolled}>글조명</LogoText>
                    </Link>
                </Logo>
                <MenuListWrapper isOpen={isOpen}>
                    <MenuList>
                        <Menu>
                            <Link href="/subscribe">
                                <MenuButton isScrolled={isScrolled}>구독</MenuButton>
                            </Link>
                        </Menu>
                        {/*<MobileMenu>*/}
                        {/*    <Link href="/login">*/}
                        {/*        <MenuButton isScrolled={isScrolled}>로그인</MenuButton>*/}
                        {/*    </Link>*/}
                        {/*</MobileMenu>*/}
                        {/*<MobileMenu>*/}
                        {/*    <Link href="/signup">*/}
                        {/*        <MenuButton isScrolled={isScrolled}>회원가입</MenuButton>*/}
                        {/*    </Link>*/}
                        {/*</MobileMenu>*/}
                    </MenuList>
                </MenuListWrapper>
                <RightContainer>
                    {/*<SearchForm>*/}
                    {/*    <SearchInput type="text" placeholder="검색..." />*/}
                    {/*    <SearchButton type="submit"><AiOutlineSearch /></SearchButton>*/}
                    {/*</SearchForm>*/}
                    {/*<MenuList>*/}
                    {/*    <ResponsiveMenu>*/}
                    {/*        <Link href="/login">*/}
                    {/*            <MenuButton isScrolled={isScrolled}>로그인</MenuButton>*/}
                    {/*        </Link>*/}
                    {/*    </ResponsiveMenu>*/}
                    {/*    <ResponsiveMenu>*/}
                    {/*        <Link href="/signup">*/}
                    {/*            <SignUpMenuButton isScrolled={isScrolled}>회원가입</SignUpMenuButton>*/}
                    {/*        </Link>*/}
                    {/*    </ResponsiveMenu>*/}
                    {/*</MenuList>*/}
                    <MenuIcon onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </MenuIcon>
                </RightContainer>
            </Navigation>
        </Base>
    );
};

export default MainHeader;
