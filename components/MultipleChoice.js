import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import styles from "./MultipleChoice.module.css";

function MultipleChoice({ question, choices, answer, explanation }) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [shakeChoice, setShakeChoice] = useState(-1);

  answer = parseInt(answer) - 1;

  useEffect(() => {
    let storedAnswer = localStorage.getItem(question + choices);
    if (storedAnswer) {
      storedAnswer = parseInt(storedAnswer);
      setSelectedChoice(storedAnswer);
      setIsCorrect(storedAnswer === answer);
    }
  }, []);

  const handleChoiceClick = (index) => {
    if (isCorrect) return;

    setSelectedChoice(index);
    const correct = index == answer;

    setIsCorrect(correct);
    if (correct) {
      // Only save to localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem(question + choices, index);
      }
      setIsExploding(true);
    } else {
      setShakeChoice(index);
      setTimeout(() => {
        setShakeChoice(-1);
      }, 500);
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.question}>{question}</div>
      {isExploding && <ConfettiExplosion />}
      {choices.map((choice, index) => (
        <div
          className={`${styles.choice} ${
            shakeChoice === index ? styles.shake : ""
          }
			${selectedChoice === index && isCorrect ? styles.correct : ""}`}
          id={"choice" + index}
          key={index}
          onClick={() => handleChoiceClick(index)}
        >
          <p>
            {choice}
            {selectedChoice === index && isCorrect && " ✔"}
          </p>
        </div>
      ))}
	  {(isCorrect && explanation) && (
		<div className={styles.explanation}>{explanation}</div>
	  )}
    </div>
  );
}

export default MultipleChoice;
