import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import SizedBox from "../components/common/SizedBox";

const Main = styled.main`
  max-width: 768px;
  height: 100vh;
  margin: auto;
  padding: 16px;
  text-align: center;
  background-color: beige;
`;

const Container = styled.div<{ show?: boolean }>`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Heading = styled.h1`
  color: #333;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #333;
  border: none;
  cursor: pointer;
  color: white;
  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;

const ContentImg = styled.img`
  width: 50%;
  height: 50%;
  @media (max-width: 768px) {
    width: 70%;
    height: 70%;
  }
`;

const HeaderLogo = styled.img`
  width: 30%;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

type SelectOptionProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const SelectOption: React.FC<SelectOptionProps> = ({ options, onSelect }) => {
  return (
    <div>
      {options.map((option) => (
        <Button key={option} onClick={() => onSelect(option)}>
          {option}
        </Button>
      ))}
    </div>
  );
};


type ThemeOptions = {
  [key: string]: string[];
};

const themeOptions: ThemeOptions = {
  총류: ["총류", "도서학", "문헌정보학", "백과사전", "일반 논문집", "일반 연속간행물", "학·협회, 기관", "신문, 언론, 저널리즘", "일반 전집, 총서", "향토자료"],
  철학: ["철학", "형이상학", "인식론, 인과론, 인간학", "철학의 체계", "경학", "동양 철학, 사상", "서양철학", "논리학", "심리학", "윤리학, 도덕철학"],
  종교: ["종교", "비교종교학", "불교", "기독교", "도교", "천도교", "신도", "바라문교, 인도교", "회교(이슬람교)", "기타 제종교"],
  사회과학: ["사회과학", "통계학", "경제학", "사회학, 사회문제", "정치학", "행정학", "법학", "교육학", "풍속, 민속학", "국방, 군사학"],
  자연과학: ["자연과학", "수학", "물리학", "화학", "천문학", "지학", "광물학", "생물과학", "식물학", "동물학"],
  기술과학: ["기술과학", "의학", "농업, 농학", "공학, 공업일반", "건축공학", "기계공학", "전기공학, 전자공학", "화학공학", "제조업", "가정학 및 가정생활"],
  예술: ["예술", "건축술", "조각", "공예, 장식미술", "서예", "회화, 도화", "사진술", "음악", "연극", "오락, 운동"],
  언어: ["언어", "한국어", "중국어", "일본어", "영어", "독일어", "프랑스어", "스페인어", "이탈리아어", "기타 제어"],
  문학: ["문학", "한국문학", "중국문학", "일본문학", "영미문학", "독일문학", "프랑스문학", "스페인문학", "이탈리아문학", "기타 제문학"],
  역사: ["역사", "아시아(아세아)", "유럽(구라파)", "아프리카", "북아메리카(북미)", "남아메리카(남미)", "오세아니아(대양주)", "양극지방", "지리", "전기"],
};

const MagicLibrary: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [subTheme, setSubTheme] = useState<string>('');
  const [recommendedBook, setRecommendedBook] = useState<string>('');
  const [showStage, setShowStage] = useState<boolean>(false);

  useEffect(() => {
    setShowStage(true);
  }, [stage]);

  const handleSelectGender = (selectedGender: string) => {
    setGender(selectedGender);
    setShowStage(false);
    setTimeout(() => {
      setStage(2);
    }, 500);
  };

  const handleSelectAge = (selectedAge: string) => {
    setAge(selectedAge);
    setShowStage(false);
    setTimeout(() => {
      setStage(3);
    }, 500);
  };

  const handleSelectTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setShowStage(false);
    setTimeout(() => {
      setStage(4);
      recommendBook(selectedTheme);
    }, 500);
  };

  const handleSelectSubTheme = (selectedSubTheme: string) => {
    setSubTheme(selectedSubTheme);
    setShowStage(false);
    setTimeout(() => {
      recommendBook(selectedSubTheme);
      setStage(5);
    }, 500);
  };

  const recommendBook = (theme: string) => {
    setRecommendedBook(`책!!`);
  };

  return (
    <Main>
      <HeaderLogo src={'/logo/horizontal_logo.svg'}/>
      <SizedBox height={'2rem'}/>
      <Container show={showStage}>
        {stage === 0 && (
          <>
            <ContentImg src={'/recommend/library1.png'} />
            <Heading>마법 도서관에 오신걸 환영합니다!!</Heading>
            <Description>
              당신은 평생 한 권만 읽을 수 있는 저주에 걸렸습니다!<br />
              마법 도서관 사서 다윈이 책 한 권을 추천해드려요!
            </Description>
            <Button onClick={() => handleSelectGender('')}>책 추천받기</Button>
          </>
        )}
        {stage === 1 && (
          <>
            <ContentImg src={'/recommend/library2.png'} />
            <Heading>마법의 거울이 당신을 비추고 있습니다.</Heading>
            <Description>당신은 어떤 분인가요?</Description>
            <SelectOption
              options={['남성', '여성', '그 외']}
              onSelect={handleSelectGender}
            />
          </>
        )}
        {stage === 2 && (
          <>
            <ContentImg src={'/recommend/library3.png'} />
            <Heading>모래시계가 흐르고 있습니다.</Heading>
            <Description>시간이 얼마나 흘렀나요?</Description>
            <SelectOption
              options={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
              onSelect={handleSelectAge}
            />
          </>
        )}
        {stage === 3 && (
          <>
            <ContentImg src={'/recommend/library4.png'} />
            <Heading>마법의 서재입니다.</Heading>
            <Description>어떤 분야에 관심이 있으신가요?</Description>
            <SelectOption
              options={[
                '총류',
                '철학',
                '종교',
                '사회과학',
                '자연과학',
                '기술과학',
                '예술',
                '언어',
                '문학',
                '역사',
              ]}
              onSelect={handleSelectTheme}
            />
          </>
        )}
        {stage === 4 && (
          <>
            <ContentImg src={'/recommend/library4.png'} />
            <Heading>마법의 서재입니다.</Heading>
            <Description>어떤 분야에 관심이 있으신가요?</Description>
            <SelectOption
              options={themeOptions[theme]}
              onSelect={handleSelectSubTheme}
            />
          </>
        )}
        {stage === 5 && (
          <>
            <Heading>당신이 평생 한권만 읽을 수 있다면</Heading>
            <Description>{recommendedBook}</Description>
            <Button onClick={() => setStage(0)}>Restart</Button>
          </>
        )}
      </Container>
    </Main>
  );
};

export default MagicLibrary;