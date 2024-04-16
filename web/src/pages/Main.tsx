import React, {useEffect, useReducer, useRef, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import {H2_400} from "../style/Style";

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
  background-color: #FFFFFF;
  border: 1px solid black;
  width: fit-content;
  border-radius: 20px;
  padding: 8px 16px;
  position: absolute;
`;

const ColorSection1 = styled.div`
  background-color: #FFB443;
  border: 1px solid black;
  border-radius: 20px;  
  width: fit-content;
  padding: 8px 16px;
  color: white;
  position: absolute;
`;

const ColorSection2 = styled.div`
  background-color: #FFB443;
  border: 1px solid black;
  border-radius: 20px;  
  width: fit-content;
  padding: 8px 16px;
  color: white;
  position: absolute;
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

      if (newX <= 0 || newX + state.width >= document.body.offsetWidth) {
        newVx = -newVx;
        newX = newX <= 0 ? 0 : document.body.offsetWidth - state.width;
      }
      if (newY <= 0 || newY + state.height >= 1134) {
        newVy = -newVy;
        newY = newY <= 0 ? 0 : 1134 - state.height;
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

const SubscribePage: React.FC = () => {
  const { ref: yellowCircle1Ref, position: yellowCircle1Pos } = useRandomMovement(500, 450, 0);
  const { ref: whiteCircle1Ref, position: whiteCircle1Pos } = useRandomMovement(600, 550, 0);
  const { ref: yellowCircle2Ref, position: yellowCircle2Pos } = useRandomMovement(1400, 350, 0);
  const { ref: whiteCircle2Ref, position: whiteCircle2Pos } = useRandomMovement(1250, 400, 0);

  const { position: normalSectionPos } = useRandomMovement(450, 200, 20);
  const { position: colorSection1Pos } = useRandomMovement(450, 900,  20);
  const { position: colorSection2Pos } = useRandomMovement(1200, 900, 20);

  return (
    <div>
      <Header/>
      <Main>
        <MovableComponent ref={yellowCircle1Ref} style={{ left: `${yellowCircle1Pos.x}px`, top: `${yellowCircle1Pos.y}px`, width: "256px", height: "256px" }} color="#FFB443"/>
        <MovableComponent ref={whiteCircle1Ref} style={{ left: `${whiteCircle1Pos.x}px`, top: `${whiteCircle1Pos.y}px`, width: "256px", height: "256px" }} color="#FFFFFF"/>
        <MovableComponent ref={yellowCircle2Ref} style={{ left: `${yellowCircle2Pos.x}px`, top: `${yellowCircle2Pos.y}px`, width: "128px", height: "128px" }} color="#FFB443"/>
        <MovableComponent ref={whiteCircle2Ref} style={{ left: `${whiteCircle2Pos.x}px`, top: `${whiteCircle2Pos.y}px`, width: "256px", height: "256px" }} color="#FFFFFF"/>
        <MainPageLogo src={'/logo/main_page_logo.svg'}/>
        <NormalSection style={{ left: `${normalSectionPos.x}px`, top: `${normalSectionPos.y}px` }}>
          <H2_400>
            공지사항<br/>
            날짜: 24.04.20<br/><br/>
            글조명 1.0ver 홈페이지 오픈~!
          </H2_400>
        </NormalSection>
        <Link href={'https://www.instagram.com/writing.lighting?igsh=c2RmM3V6eHpuNGc2&utm_source=qr'} target={'_blank'}>
          <ColorSection1 style={{ left: `${colorSection1Pos.x}px`, top: `${colorSection1Pos.y}px` }}>
            <H2_400>
              글조명 인스타 팔로우하고<br/>
              나만의 꽃 그림 받아가세요~
            </H2_400>
          </ColorSection1>
        </Link>
        <Link href={'https://www.instagram.com/writing.lighting?igsh=c2RmM3V6eHpuNGc2&utm_source=qr'} target={'_blank'}>
          <ColorSection2 style={{ left: `${colorSection2Pos.x}px`, top: `${colorSection2Pos.y}px` }}>
            <H2_400>
              인스타그램<br/>
              바로가기
            </H2_400>
          </ColorSection2>
        </Link>
      </Main>
      <Footer/>
    </div>
  );
};

export default SubscribePage;
