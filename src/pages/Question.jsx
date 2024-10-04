import React,{useState} from 'react'
import { createSearchParams, useNavigate } from "react-router-dom"
import { Button, ProgressBar } from 'react-bootstrap'
import styled from 'styled-components'
import { QuestionData } from '../assets/questiondata'

const Wrapper = styled.div`
  width:100%;
  height:100vh;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  color:#fff;
  `
const Title = styled.div`
  font-size:30px;
  width:auto;
  margin-bottom:10px;
  padding:10px 22px;
  background:orange;
  border-radius:8px;
  text-align: center;
  @media (max-width:780px) {
    font-size:28px;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  *{ 
    width:400px;
    height:200px;
    font-size:24px;
  }
  @media (max-width:780px) {
    flex-direction:column;
    *{
      width:300px;
      height:100px;
      font-size:18px;
    }
  }
  @media (max-width:360px) {
    flex-direction:column;
    *{
      width:200px;
      height:100px;
      font-size:16px;
    }
  }
`


const Question = () => {
  const [questionNum, setQuestionNum] = useState(0);
  
const [totalScore,setTotalScore] = useState(
[
  {
    id : "EI", 
    score: 0,
  },
  {
    id : "SN", 
    score: 0,
  },
  {
    id : "TF", 
    score: 0,
  },
  {
    id : "JP", 
    score: 0,
  },
]);

const navigate = useNavigate();

  // const handleClickBtnA = (num, type) => {
  //   // type에 대한 정의 부분 좀 어려움
  //   if(type === "EI"){
  //     const addScore = totalScore[0].score + num;
  //     const newObject = {id:"EI", score: addScore};
  //     totalScore.splice(0, 1, newObject);
  //   } else if(type === "SN"){
  //     const addScore = totalScore[1].score + num;
  //     const newObject = {id:"SN", score: addScore};
  //     totalScore.splice(1, 1, newObject);
  //   }else if(type === "TF"){
  //     const addScore = totalScore[2].score + num;
  //     const newObject = {id:"TF", score: addScore};
  //     totalScore.splice(2, 1, newObject);
  //   }else {
  //     const addScore = totalScore[3].score + num;
  //     const newObject = {id:"JP", score: addScore};
  //     totalScore.splice(3, 1, newObject);
  //   }
  //   //num에 대한 정의
  //   setQuestionNum( questionNum + 1);
  // }
  // const handleClickBtnB = (num, type) => {
  //   // type에 대한 정의
  //   if(type === "EI"){
  //     const addScore = totalScore[0].score + num;
  //     const newObject = {id:"EI", score: addScore};
  //     totalScore.splice(0, 1, newObject);
  //   } else if(type === "SN"){
  //     const addScore = totalScore[1].score + num;
  //     const newObject = {id:"SN", score: addScore};
  //     totalScore.splice(1, 1, newObject);
  //   }else if(type === "TF"){
  //     const addScore = totalScore[2].score + num;
  //     const newObject = {id:"TF", score: addScore};
  //     totalScore.splice(2, 1, newObject);
  //   }else {
  //     const addScore = totalScore[3].score + num;
  //     const newObject = {id:"JP", score: addScore};
  //     totalScore.splice(3, 1, newObject);
  //   }
  //   // num에 대한 정의
  //   setQuestionNum( questionNum + 1);
  // }
  // console.log(totalScore)
  

const handleClickBtn = (num, type) => {
  const newScore = totalScore.map((s) =>
    s.id === type
      ? {
          id: s.id,
          score: s.score + num,
        }
      : s
  );

  setTotalScore(newScore);
  if(QuestionData.length !== questionNum +1 ){
    setQuestionNum(questionNum + 1)
  }else {
    const mbti = newScore.reduce(
      (acc, curr) => acc + (curr.score >= 2 ? curr.id.substring(0,1) : curr.id.substring(1,2)),
      ""
    );
    // console.log(mbti)
    navigate({
      pathname:"/result",
      search:`?${createSearchParams({
        mbti:mbti,
      })}`,
    });
    }
  };

  return (
    <>
      <ProgressBar striped variant='success'now={(questionNum / QuestionData.length) * 100} />
      <Wrapper>
        <Title>{QuestionData[questionNum].title}</Title>
        <ButtonGroup>
          <Button onClick={() => handleClickBtn(1, QuestionData[questionNum].type)} variant="warning">{QuestionData[questionNum].answera}</Button>
          <Button onClick={() => handleClickBtn(0, QuestionData[questionNum].type) } variant="warning">{QuestionData[questionNum].answerb}</Button>
        </ButtonGroup>
      </Wrapper>
    </>
  )
}

export default Question
