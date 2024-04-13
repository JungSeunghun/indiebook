import React, {useRef, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import dayjs, {Dayjs} from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import TextField from '@mui/material/TextField';

const Main = styled.main`
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const sharedInputStyles = `
  padding: 8px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Input = styled.input`
  ${sharedInputStyles};
`;

const InputText = styled.input`
  ${sharedInputStyles};
  width: 200px;
`;

const PhoneInput = styled.input`
  ${sharedInputStyles};
  width: 60px;
`;

const EmailInput = styled.input`
  ${sharedInputStyles};
`;

const EmailDomainSelect = styled.select`
  ${sharedInputStyles};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.input`
  width: 150px;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const datepickerTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '220px',
          height: '36px',
          '& .MuiInputBase-input': {
            height: '36px',
            padding: '0 14px',
          },
          '& .MuiInputBase-root': {
            height: '36px',
          },
        },
      },
    },
  },
});

const SubscribePage: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState(['', '', '']);
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [customDomain, setCustomDomain] = useState<string | null>('');
  const [birth, setBirth] = useState<Dayjs | null>(dayjs());

  const phoneInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handlePhoneChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = [...phone];
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    newPhone[index] = numericValue;
    setPhone(newPhone);

    if (numericValue.length === e.target.maxLength && index < phone.length - 1) {
      const nextInput = phoneInputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };


  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmailDomain(e.target.value);
    if (e.target.value === "custom") {
      setCustomDomain('');
    } else {
      setCustomDomain(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const domain = customDomain || emailDomain;
    console.log({
      name,
      gender,
      phone: phone.join(''),
      email: `${emailId}@${domain}`,
    });
  };

  return (
    <div>
      <Header/>
      <Main>
        <Title>"구독하기"</Title>
        <Form onSubmit={handleSubmit}>
          <FieldContainer>
            <Label htmlFor="name">1. 이름</Label>
            <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </FieldContainer>
          {/*<FieldContainer>*/}
          {/*  <Label htmlFor="age">2. 나이</Label>*/}
          {/*  <InputText id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />*/}
          {/*</FieldContainer>*/}
          <FieldContainer>
            <Label htmlFor="birthYear">2. 생년월일</Label>
            <ThemeProvider theme={datepickerTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format={'YYYY-MM-DD'}
                  value={birth}
                  onChange={(newValue: Dayjs | null) => {
                    setBirth(newValue);
                  }}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </FieldContainer>
          <FieldContainer>
            <Label>3. 성별</Label>
            <CheckboxContainer>
              <div>
                <Input id="male" type="radio" name="gender" value="남성" checked={gender === '남성'}
                       onChange={(e) => setGender(e.target.value)}/>
                <label htmlFor="male">남성</label>
                <Input id="female" type="radio" name="gender" value="여성" checked={gender === '여성'}
                       onChange={(e) => setGender(e.target.value)}/>
                <label htmlFor="female">여성</label>
              </div>
            </CheckboxContainer>
          </FieldContainer>
          <FieldContainer>
            <Label htmlFor="phone1">4. 전화번호</Label>
            <div style={{display: 'flex', gap: '8px'}}>
              <PhoneInput
                ref={phoneInputRefs[0]}
                id="phone1"
                value={phone[0]}
                onChange={handlePhoneChange(0)}
                maxLength={3}
              />
              <PhoneInput
                ref={phoneInputRefs[1]}
                id="phone2"
                value={phone[1]}
                onChange={handlePhoneChange(1)}
                maxLength={4}
              />
              <PhoneInput
                ref={phoneInputRefs[2]}
                id="phone3"
                value={phone[2]}
                onChange={handlePhoneChange(2)}
                maxLength={4}
              />

            </div>
          </FieldContainer>
          <FieldContainer>
            <Label htmlFor="emailId">5. 이메일</Label>
            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
              <EmailInput id="emailId" type="text" placeholder="ID" value={emailId}
                          onChange={(e) => setEmailId(e.target.value)}/>
              <span>@</span>
              {customDomain !== null && (
                <EmailInput
                  placeholder="직접 입력"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
              <EmailDomainSelect value={emailDomain} onChange={handleDomainChange}>
                <option value="">선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">직접 입력</option>
              </EmailDomainSelect>
            </div>
          </FieldContainer>
          <ButtonContainer>
            <Button type="submit" value="구독하기"/>
          </ButtonContainer>
        </Form>
      </Main>
      <Footer/>
    </div>
  );
};

export default SubscribePage;
