import React from 'react';

interface ResultProps {
    TOTAL_QUESTIONS: number;
    score: number;
    // correctAnswers: number;
    // incorrectAnswers: number;
    onTryAgain: () => void;
}

const Result: React.FC<ResultProps> = ({
    TOTAL_QUESTIONS,
    score,
    // correctAnswers,
    // incorrectAnswers,
    onTryAgain
}) => {
    return (
        <div>
            <h3>Result</h3>
            <p>
                Total Questions: <span>{TOTAL_QUESTIONS}</span>
            </p>
            <p>
                Total score: <span>{score}</span>
            </p>
            {/* <p>
                Correct Answers: <span>{correctAnswers}</span>
            </p>
            <p>
                Wrong Answers: <span>{incorrectAnswers}</span> */}
            {/* </p> */}
            <button onClick={onTryAgain}>Try again</button>
        </div>
    );
}

export default Result;
