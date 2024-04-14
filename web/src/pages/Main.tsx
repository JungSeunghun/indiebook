import React, {useEffect, useReducer, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';

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
  padding: 5px 10px;
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
`;

const ColorSection1 = styled.div`
  background-color: #FFB443;
  border: 1px solid black;
  border-radius: 20px;  
  width: fit-content;
  padding: 5px 10px;
  color: white;
  position: absolute;
  top: 70%;
  left: 40%;
  transform: translate(-50%, -50%);
`;

const ColorSection2 = styled.div`
  background-color: #FFB443;
  border: 1px solid black;
  border-radius: 20px;  
  width: fit-content;
  padding: 5px 10px;
  color: white;
  position: absolute;
  top: 70%;
  left: 60%;
  transform: translate(-50%, -50%);
`;

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

interface State {
  position: Position;
  velocity: Velocity;
  width: number;
}

type Action = {
  type: 'MOVE';
};

function movementReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MOVE':
      let newX = state.position.x + state.velocity.vx;
      let newY = state.position.y + state.velocity.vy;
      let newVx = state.velocity.vx;
      let newVy = state.velocity.vy;

      if (newX <= 0 || newX >= window.innerWidth - state.width) {
        newVx = -newVx;
      }
      if (newY <= 0 || newY >= 1134 - state.width) {
        newVy = -newVy;
      }

      return {
        ...state,
        position: { x: newX, y: newY },
        velocity: { vx: newVx, vy: newVy },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useRandomMovement(initialX: number, initialY: number, initialWidth: number) {
  // 화면의 중앙을 계산
  const centerX = window.innerWidth / 2;

  const [state, dispatch] = useReducer(movementReducer, {
    position: { x: centerX + initialX, y:  initialY },
    velocity: {
      vx: Math.random() * 0.4 - 0.2, // 속도는 그대로 유지
      vy: Math.random() * 0.4 - 0.2,
    },
    width: initialWidth,
  });

  useEffect(() => {
    let animationFrameId: number;

    function move() {
      dispatch({ type: 'MOVE' });
      animationFrameId = requestAnimationFrame(move);
    }

    move();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return { position: state.position, width: state.width };
}

interface MovableComponentProps {
  width: number;
  color: string;
}

const MovableComponent = styled.div<MovableComponentProps>`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.width}px`};
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  opacity: 0.5;
`;

const SubscribePage: React.FC = () => {
  const { position: yellowCircle1Pos, width: yellowCircle1Width } = useRandomMovement(-500, 100, 256);
  const { position: whiteCircle1Pos, width: whiteCircle1Width } = useRandomMovement(-400, 225, 256);
  const { position: yellowCircle2Pos, width: yellowCircle2Width } = useRandomMovement(400, 300, 128);
  const { position: whiteCircle2Pos, width: whiteCircle2Width } = useRandomMovement(250, 350, 256);

  const { position: normalSectionPos } = useRandomMovement(-200, 200, 200); // NormalSection 컴포넌트용
  const { position: colorSection1Pos } = useRandomMovement(-200, 600, 200); // ColorSection1 컴포넌트용
  const { position: colorSection2Pos } = useRandomMovement(200, 600, 200); // ColorSection2 컴포넌트용

  return (
    <div>
      <Header/>
      <Main>
        <MovableComponent style={{ left: `${yellowCircle1Pos.x}px`, top: `${yellowCircle1Pos.y}px` }} color="#FFB443" width={yellowCircle1Width}/>
        <MovableComponent style={{ left: `${whiteCircle1Pos.x}px`, top: `${whiteCircle1Pos.y}px` }} color="#FFFFFF" width={whiteCircle1Width}/>
        <MovableComponent style={{ left: `${yellowCircle2Pos.x}px`, top: `${yellowCircle2Pos.y}px` }} color="#FFB443" width={yellowCircle2Width}/>
        <MovableComponent style={{ left: `${whiteCircle2Pos.x}px`, top: `${whiteCircle2Pos.y}px` }} color="#FFFFFF" width={whiteCircle2Width}/>
        <MainPageLogo src={'/logo/main_page_logo.svg'}/>
        <NormalSection style={{ left: `${normalSectionPos.x}px`, top: `${normalSectionPos.y}px` }}>
          공지사항<br/>
          날짜: 24.04.20<br/><br/>
          글조명 1.0ver 홈페이지 오픈~!
        </NormalSection>
        <ColorSection1 style={{ left: `${colorSection1Pos.x}px`, top: `${colorSection1Pos.y}px` }}>
          글조명 인스타 팔로우하고<br/>
          나만의 꽃 그림 받아가세요~
        </ColorSection1>
        <ColorSection2 style={{ left: `${colorSection2Pos.x}px`, top: `${colorSection2Pos.y}px` }}>
          인스타그램<br/>
          바로가기
        </ColorSection2>
      </Main>
      <Footer/>
    </div>
  );
};

export default SubscribePage;
