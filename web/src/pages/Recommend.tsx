import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import SizedBox from "../components/common/SizedBox";
import {Helmet} from "react-helmet-async";

const Main = styled.main`
  max-width: 768px;
  height: 100vh;
  margin: auto;
  padding: 16px;
  text-align: center;
  background-color: beige;
`;

const Container = styled.div<{ show?: string }>`
  opacity: ${props => props.show === "true" ? "1" : "0"};
  transition: opacity 0.5s ease-in-out;
`;

const Heading = styled.h1`
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #333;
  border: none;
  cursor: pointer;
  color: white;
`;

const BackButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: beige;
  border: 1px solid #333;
  cursor: pointer;
  color: #333;
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

const BookImage = styled.img`
  width: 30%;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

type Option = {
  label: string;
  value: string;
};

const genderOptions = [
  { label: '남성', value: '0' },
  { label: '여성', value: '1' },
  { label: '상관없어요', value: '2' }
];

const ageOptions = [
  { label: '10대', value: '14' },
  { label: '20대', value: '20' },
  { label: '30대', value: '30' },
  { label: '40대', value: '40' },
  { label: '50대', value: '50' },
  { label: '60대 이상', value: '60' },
];

type SelectOptionProps = {
  options: Option[];
  onSelect: (value: string) => void;
};

const SelectOption: React.FC<SelectOptionProps> = ({ options, onSelect }) => {
  return (
    <div>
      {options.map((option) => (
        <Button key={option.value}
                className={'select-option'}
                onClick={() => onSelect(option.value)}>
          {option.label}
        </Button>
      ))}
    </div>
  );
};

type TopicMapping = {
  [id: string]: {
    name: string;
    subtopics: Option[];
  }
};

const topicMapping: TopicMapping = {
  "0": {
    name: "총류",
    subtopics: [
      { label: "총류", value: "00" },
      { label: "도서학, 서지학", value: "01" },
      { label: "문헌정보학", value: "02" },
      { label: "백과사전", value: "03" },
      { label: "일반 논문집", value: "04" },
      { label: "일반 연속간행물", value: "05" },
      { label: "학·협회, 기관", value: "06" },
      { label: "신문, 언론, 저널리즘", value: "07" },
      { label: "일반 전집, 총서", value: "08" },
      { label: "향토자료", value: "09" }
    ]
  },
  "1": {
    name: "철학",
    subtopics: [
      { label: "철학", value: "10" },
      { label: "형이상학", value: "11" },
      { label: "인식론, 인과론, 인간학", value: "12" },
      { label: "철학의 체계", value: "13" },
      { label: "경학", value: "14" },
      { label: "동양 철학, 사상", value: "15" },
      { label: "서양철학", value: "16" },
      { label: "논리학", value: "17" },
      { label: "심리학", value: "18" },
      { label: "윤리학, 도덕철학", value: "19" }
    ]
  },
  "2": {
    name: "종교",
    subtopics: [
      { label: "종교", value: "20" },
      { label: "비종교학", value: "21" },
      { label: "불교", value: "22" },
      { label: "기도교", value: "23" },
      { label: "도교", value: "24" },
      { label: "천도교", value: "25" },
      { label: "신도", value: "26" },
      { label: "바라문교, 인도교", value: "27" },
      { label: "회교(이슬람교)", value: "28" },
      { label: "기타 제종교", value: "29" }
    ]
  },
  "3": {
    name: "사회과학",
    subtopics: [
      { label: "사회과학", value: "30" },
      { label: "통계학", value: "31" },
      { label: "경제학", value: "32" },
      { label: "사회학, 사회문제", value: "33" },
      { label: "정치학", value: "34" },
      { label: "행정학", value: "35" },
      { label: "법학", value: "36" },
      { label: "교육학", value: "37" },
      { label: "풍속, 민속학", value: "38" },
      { label: "국방, 군사학", value: "39" }
    ]
  },
  "4": {
    name: "자연과학",
    subtopics: [
      { label: "자연과학", value: "40" },
      { label: "수학", value: "41" },
      { label: "물리학", value: "42" },
      { label: "화학", value: "43" },
      { label: "천문학", value: "44" },
      { label: "지학", value: "45" },
      { label: "광물학", value: "46" },
      { label: "생물과학", value: "47" },
      { label: "식물학", value: "48" },
      { label: "동물학", value: "49" }
    ]
  },
  "5": {
    name: "기술과학",
    subtopics: [
      { label: "기술과학", value: "50" },
      { label: "의학", value: "51" },
      { label: "농업, 농학", value: "52" },
      { label: "공학, 공업일반", value: "53" },
      { label: "건축공학", value: "54" },
      { label: "기계공학", value: "55" },
      { label: "전기공학, 전자공학", value: "56" },
      { label: "화학공학", value: "57" },
      { label: "제조업", value: "58" },
      { label: "가정학 및 가정생활", value: "59" }
    ]
  },
  "6": {
    name: "예술",
    subtopics: [
      { label: "예술", value: "60" },
      { label: "건축술", value: "61" },
      { label: "조각", value: "62" },
      { label: "공예, 장식미술", value: "63" },
      { label: "서예", value: "64" },
      { label: "회화, 도화", value: "65" },
      { label: "사진술", value: "66" },
      { label: "음악", value: "67" },
      { label: "연극", value: "68" },
      { label: "오락, 운동", value: "69" }
    ]
  },
  "7": {
    name: "언어",
    subtopics: [
      { label: "언어", value: "70" },
      { label: "한국어", value: "71" },
      { label: "중국어", value: "72" },
      { label: "일본어", value: "73" },
      { label: "영어", value: "74" },
      { label: "독일어", value: "75" },
      { label: "프랑스어", value: "76" },
      { label: "스페인어", value: "77" },
      { label: "이탈리아어", value: "78" },
      { label: "기타 제어", value: "79" }
    ]
  },
  "8": {
    name: "문학",
    subtopics: [
      { label: "문학", value: "80" },
      { label: "한국문학", value: "81" },
      { label: "중국문학", value: "82" },
      { label: "일본문학", value: "83" },
      { label: "영미문학", value: "84" },
      { label: "독일문학", value: "85" },
      { label: "프랑스문학", value: "86" },
      { label: "스페인문학", value: "87" },
      { label: "이탈리아문학", value: "88" },
      { label: "기타 제문학", value: "89" }
    ]
  },
  "9": {
    name: "역사",
    subtopics: [
      { label: "역사", value: "90" },
      { label: "아시아(아세아)", value: "91" },
      { label: "유럽(구라파)", value: "92" },
      { label: "아프리카", value: "93" },
      { label: "북아메리카(북미)", value: "94" },
      { label: "남아메리카(남미)", value: "95" },
      { label: "오세아니아(대양주)", value: "96" },
      { label: "양극지방", value: "97" },
      { label: "지리", value: "98" },
      { label: "전기", value: "99" }
    ]
  }
};

type BookInfo = {
  name: string;
  authors: string;
  publisher: string;
  imageUrl: string;
  url: string;
};

const getTopicOptions = () => Object.keys(topicMapping).map(key => ({
  label: topicMapping[key].name,
  value: key
}));

const getSubtopicOptions = (themeKey: string) => {
  return topicMapping[themeKey]?.subtopics || [];
};

const MagicLibrary: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [subTheme, setSubTheme] = useState<string>('');
  const [recommendedBook, setRecommendedBook] = useState<BookInfo | null>(null);
  const [showStage, setShowStage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setShowStage(true);
  }, [stage]);

  useEffect(() => {
    if (subTheme) {
      recommendBook();
    }
  }, [subTheme]);

  const startStage = () => {
    setShowStage(false);
    setTimeout(() => {
      setStage(1);
    }, 500);
  }

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
    }, 500);
  };

  const handleSelectSubTheme = (selectedSubTheme: string) => {
    setSubTheme(selectedSubTheme);
    setShowStage(false);
    setTimeout(() => {
      setStage(5);
    }, 500);
  };

  const recommendBook = () => {
    fetchData();
  };

  const handleRestart = () => {
    setGender('');
    setAge('');
    setTheme('');
    setSubTheme('');
    setRecommendedBook(null);
    setStage(0);
  };

  const handleGoBack = () => {
    if (stage > 0) {
      setShowStage(false);
      setTimeout(() => {
        setStage(stage - 1);
      }, 500);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const authKey = '87cbd6deab665aa0aa1eeedf22989f704cdb80de75d703a46ce6229786e037fc';
    const startDt = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
    const endDt = new Date().toISOString().slice(0, 10);

    const url = `https://data4library.kr/api/loanItemSrch?authKey=${authKey}&startDt=${startDt}&endDt=${endDt}&gender=${gender}&age=${age}&kdc=${theme}&dtl_kdc=${subTheme}&format=json&pageSize=15`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.response && json.response.docs.length > 0) {
        const randomIndex = Math.floor(Math.random() * json.response.docs.length);
        const selectedBook = json.response.docs[randomIndex].doc;

        const newRecommendedBook = {
          name: selectedBook.bookname,
          authors: selectedBook.authors,
          publisher: selectedBook.publisher,
          imageUrl: selectedBook.bookImageURL,
          url: selectedBook.bookDtlUrl,
        };
        setRecommendedBook(newRecommendedBook);
      } else {
        setRecommendedBook(null);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setRecommendedBook(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>책 추천 - 글조명</title>
        <meta name="description" content="최고의 책 추천을 받아보세요. 글조명에서는 다양한 장르의 책을 추천합니다." />
        <meta property="og:title" content="책 추천 - 글조명" />
        <meta property="og:description" content="최고의 책 추천을 여기에서. 글조명과 함께하세요." />
        <meta property="og:image" content="%PUBLIC_URL%/logo.png" />
      </Helmet>
      <Main>
        <SizedBox height={'2rem'}/>
        <HeaderLogo src={'/logo/horizontal_logo.svg'} alt={"글조명 로고 이미지"}/>
        <SizedBox height={'2.5rem'}/>
        <Container show={showStage.toString()}>
        {stage === 0 && (
            <>
              <ContentImg src={'/images/recommend/library1.png'} />
              <Heading>마법 도서관에 오신걸 환영합니다!!</Heading>
              <Description>
                당신은 평생 한 권만 읽을 수 있는 저주에 걸렸습니다!<br />
                마법 도서관 사서 다윈이 책 한 권을 추천해드려요!
              </Description>
              <Button onClick={startStage}>책 추천받기</Button>
            </>
          )}
          {stage === 1 && (
            <>
              <ContentImg src={'/images/recommend/library2.png'} />
              <Heading>마법의 거울이 당신을 비추고 있습니다.</Heading>
              <Description>당신은 어떤 분인가요?</Description>
              <SelectOption
                options={genderOptions}
                onSelect={handleSelectGender}
              />
            </>
          )}
          {stage === 2 && (
            <>
              <ContentImg src={'/images/recommend/library3.png'} />
              <Heading>모래시계가 흐르고 있습니다.</Heading>
              <Description>시간이 얼마나 흘렀나요?</Description>
              <SelectOption
                options={ageOptions}
                onSelect={handleSelectAge}
              />
            </>
          )}
          {stage === 3 && (
            <>
              <ContentImg src={'/images/recommend/library4.png'} />
              <Heading>마법의 서재입니다.</Heading>
              <Description>어떤 분야에 관심이 있으신가요?</Description>
              <SelectOption
                options={getTopicOptions()}
                onSelect={handleSelectTheme}
              />
            </>
          )}
          {stage === 4 && (
            <>
              <ContentImg src={'/images/recommend/library4.png'} />
              <Heading>마법의 서재입니다.</Heading>
              <Description>더 자세하게 선택해볼까요?</Description>
              <SelectOption
                options={getSubtopicOptions(theme)}
                onSelect={handleSelectSubTheme}
              />
            </>
          )}
          {stage === 5 && (
            <>
              <Heading>당신이 평생 한권만 읽을 수 있다면</Heading>
              {isLoading ? (
                <Description>Loading...</Description>
              ) : recommendedBook ? (
                <div>
                  <a href={recommendedBook.url}>
                    <BookImage src={recommendedBook.imageUrl} alt="Recommended Book" />
                  </a>
                  <Description>
                    책제목: {recommendedBook.name}<br/><br/>
                    저자: {recommendedBook.authors}<br/><br/>
                    출판사: {recommendedBook.publisher}<br/><br/>
                  </Description>
                  <Button onClick={handleRestart}>Restart</Button>
                </div>
              ) : (
                <Description>No recommendation available.</Description>
              )}
            </>
          )}

          {stage >= 1 && stage < 5 && (
            <BackButton onClick={handleGoBack}>뒤로 가기</BackButton>
          )}
        </Container>
      </Main>
    </>
  );
};

export default MagicLibrary;
