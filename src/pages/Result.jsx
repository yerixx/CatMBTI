import React,{ useState , useEffect } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom';
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import { resultdata } from '../assets/resultdata.js'
import KakaoShareBtn from '../components/KakaoShareBtn.jsx';

const Wrapper = styled.div`
  color:#fff;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  gap:20px;
  width:100%;
  height:100vh;
  color:#fff;
`
const Header = styled.div`
  font-size:40px;
`
const Contents = styled.div`
  width:100%;
  height:auto;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  gap:20px;
`
const Title = styled.div`
  font-size:30px;
`
const LogoImg = styled.div`
  *{
    width:350px;
    height:350px;
    border:4px solid #fff;
    @media (max-width:780px) {
      width:200px;
      height:200px;
    }
  }
`
const Desc = styled.div`
  margin:10px 0;
  font-size:20px;
  text-align:center;
  background:green;
  padding:10px;
  border-radius:10px;

`
const Text = styled.div`
  width:550px;
  background:orange;
  padding:20px 50px;
  font-size:25px;
  line-height:40px;
  border-radius:10px;
  @media (max-width:780px) {
    width:360px;
    font-size:24px;
    padding: 10px 20px;
    line-height:28px;
  }
`
const BtnGroup = styled.div`
  display: flex;
  gap:10px;
`

const Result = () => {
  const [resultData, setResultData] = useState({})
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti")
  // console.log(searchParams)
  // console.log(mbti)
  const navigate = useNavigate();
  const handleClickBtn = () => {
    navigate("/");
  };
  useEffect(() => {
    const result = resultdata.find((s)=> s.best === mbti);
    setResultData(result);
  },[mbti]);

  // console.log(resultData)
  return (
<Wrapper>
      <Header>두구두구 예비집사 판별기</Header>
      <Contents>
        <Title>결과보기 </Title>
        <LogoImg>
          <img className='rounded-circle' src={resultData.image}/>
        </LogoImg>
        <Desc>예비 집사님과 찰떡궁합인 고양이는 ~~?<br/>🐈🐈🐈{resultData.best}형 {resultData.name}입니다!!!!🐈🐈🐈</Desc>
        <Text>{resultData.desc}</Text>
        <BtnGroup>
          <Button variant="warning" onClick={handleClickBtn}>테스트 다시하기</Button>
          <KakaoShareBtn data={resultData} />
        </BtnGroup>
      </Contents>
    </Wrapper>
  )
}

export default Result
