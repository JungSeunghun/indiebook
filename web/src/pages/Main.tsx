import React, {useEffect, useReducer, useRef, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from "styled-components";
import {Helmet} from "react-helmet-async";

const Main = styled.main`
  max-width: 1136px;
  height: 1134px;
`;

const MainPageLogo = styled.img`
  width: 169.23px;
  height: 679.28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NormalSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  width: fit-content;
  border-radius: 20px;
  padding: 8px 16px;
  position: absolute;
  
  font-size: 1.875rem;
  line-height: 40px;
  letter-spacing: -0.02rem;
  margin: 0;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ColorSection1 = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 20px;  
  width: fit-content;
  padding: 8px 16px;
  color: white;
  position: absolute;

  font-size: 1.875rem;
  line-height: 40px;
  letter-spacing: -0.02rem;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ColorSection2 = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 20px;  
  width: fit-content;
  padding: 8px 16px;
  color: white;
  position: absolute;

  font-size: 1.875rem;
  line-height: 40px;
  letter-spacing: -0.02rem;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Link = styled.a`
`;

interface State {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    vx: number;
    vy: number;
  };
  width: number;
  height: number;
}

interface Action {
  type: 'MOVE' | 'UPDATE_DIMENSIONS';
  payload?: { width: number; height: number };
}

function movementReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MOVE':
      let newX = state.position.x + state.velocity.vx;
      let newY = state.position.y + state.velocity.vy;
      let newVx = state.velocity.vx;
      let newVy = state.velocity.vy;

      if (newX <= 0 || newX + (state.width / document.body.offsetWidth * 100) >= 100) {
        newVx = -newVx;
        newX = newX <= 0 ? 0 : 100 - (state.width / document.body.offsetWidth * 100);
      }
      if (newY <= 0 || newY + (state.height / document.body.offsetHeight * 100) >= 100) {
        newVy = -newVy;
        newY = newY <= 0 ? 0 : 100 - (state.height / document.body.offsetHeight * 100);
      }

      return {
        ...state,
        position: { x: newX, y: newY },
        velocity: { vx: newVx, vy: newVy },
      };
    case 'UPDATE_DIMENSIONS':
      if (action.payload) {
        return {
          ...state,
          width: action.payload.width,
          height: action.payload.height,
        };
      }
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useRandomMovement(initialX: number, initialY: number, speedFactor: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [state, dispatch] = useReducer(movementReducer, {
    position: { x: initialX, y: initialY },
    velocity: {
      vx: (Math.random() * 0.4 - 0.2) * speedFactor,
      vy: (Math.random() * 0.4 - 0.2) * speedFactor,
    },
    ...dimensions,
  });

  useEffect(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
      dispatch({ type: 'UPDATE_DIMENSIONS', payload: { width: offsetWidth, height: offsetHeight } });
    }
  }, [ref.current]);

  useEffect(() => {
    let animationFrameId: number;

    function move() {
      dispatch({ type: 'MOVE' });
      animationFrameId = requestAnimationFrame(move);
    }

    move();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return { ref, position: state.position, ...dimensions };
}

interface MovableComponentProps {
  color: string;
}

const MovableComponent = styled.div<MovableComponentProps>`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  opacity: 0.5;
`;

const MainPage: React.FC = () => {
  const { ref: yellowCircle1Ref, position: yellowCircle1Pos } = useRandomMovement(25, 25, 0.5);
  const { ref: whiteCircle1Ref, position: whiteCircle1Pos } = useRandomMovement(30, 30, 0.5);
  const { ref: yellowCircle2Ref, position: yellowCircle2Pos } = useRandomMovement(60, 25, 0.5);
  const { ref: whiteCircle2Ref, position: whiteCircle2Pos } = useRandomMovement(55, 30, 0.5);

  const { ref: normalSectionRef, position: normalSectionPos } = useRandomMovement(20, 10, 0.1);
  const { ref: colorSection1Ref, position: colorSection1Pos } = useRandomMovement(20, 60,  0.1);
  const { ref: colorSection2Ref, position: colorSection2Pos } = useRandomMovement(60, 60, 0.1);

  return (
    <>
      <Helmet>
        <title>메인 페이지 - 글조명</title>
        <meta property="og:title" content="글조명" />
        <meta property="og:description" content="글조명, 글을 조명하다." />
        <meta property="og:image" content="%PUBLIC_URL%/logo.png" />
      </Helmet>
      <div>
        <MovableComponent ref={yellowCircle1Ref} style={{ left: `${yellowCircle1Pos.x}%`, top: `${yellowCircle1Pos.y}%`, width: "256px", height: "256px" }} color="#FFB443"/>
        <MovableComponent ref={whiteCircle1Ref} style={{ left: `${whiteCircle1Pos.x}%`, top: `${whiteCircle1Pos.y}%`, width: "256px", height: "256px" }} color="#FFFFFF"/>
        <MovableComponent ref={yellowCircle2Ref} style={{ left: `${yellowCircle2Pos.x}%`, top: `${yellowCircle2Pos.y}%`, width: "128px", height: "128px" }} color="#FFB443"/>
        <MovableComponent ref={whiteCircle2Ref} style={{ left: `${whiteCircle2Pos.x}%`, top: `${whiteCircle2Pos.y}%`, width: "256px", height: "256px" }} color="#FFFFFF"/>
        <Header/>
        <Main>
          <MainPageLogo src={'/logo/main_page_logo.svg'}/>
          <NormalSection ref={normalSectionRef} style={{ left: `${normalSectionPos.x}%`, top: `${normalSectionPos.y}%` }}>
            공지사항<br/>
            날짜: 24.04.20<br/><br/>
            글조명 1.0ver 홈페이지 오픈~!
          </NormalSection>
          <Link href={'https://www.instagram.com/textlamp'} target={'_blank'}>
            <ColorSection1 ref={colorSection1Ref} style={{ left: `${colorSection1Pos.x}%`, top: `${colorSection1Pos.y}%` }}>
              글조명 인스타 팔로우하고<br/>
              나만의 꽃 그림 받아가세요~
            </ColorSection1>
          </Link>
          <Link href={'https://www.instagram.com/textlamp'} target={'_blank'}>
            <ColorSection2 ref={colorSection2Ref} style={{ left: `${colorSection2Pos.x}%`, top: `${colorSection2Pos.y}%` }}>
              인스타그램<br/>
              바로가기
            </ColorSection2>
          </Link>
        </Main>
        <Footer/>
      </div>
    </>
  );
};

export default MainPage;
