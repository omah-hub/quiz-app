import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import {  QuestionState, Difficulty } from './API';
import Result from './components/Result';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setloading] = useState(false);
  const [questions, SetQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
console.log(questions);

  const startTrivia = async () => {
    setloading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    SetQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setloading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);

    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }
  }
  const onTryAgain = () => {
    setGameOver(true);
    setScore(0);
    setNumber(0);
    setUserAnswers([]);
    setloading(false);
    // Additional logic to fetch questions again if needed
};

  return (
    <div className="App justify-center text-yellow-200 text-5xl">
      <h1 className='animate-bounce py-6 pt-[40px]'>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='=start ml-6' onClick={startTrivia}>
        Start
      </button>
      ) : null}
      
      {!gameOver ? <p className='score text-green-300'>Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>Next Question</button>
      ) : null}

      {!gameOver && userAnswers.length === TOTAL_QUESTIONS ? (
                <Result
                    TOTAL_QUESTIONS={TOTAL_QUESTIONS}
                    score={score}
                    // correctAnswers={/* Calculate correct answers */}
                    // incorrectAnswers={/* Calculate incorrect answers */}
                    onTryAgain={onTryAgain}
                />
            ) : null}
    </div>
  );
}

export default App;
