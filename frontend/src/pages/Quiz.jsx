import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Question from "../components/Question";
import Timer from "../components/Timer";
import "./Quiz.css";

function Quiz({ selectedTimer, selectedDifficulty }) {
  const { state } = useLocation();
  const { category } = state;
  const { valueD } = selectedDifficulty;
  const { valueT } = selectedTimer;
  // state permettant de stocker l'ensemble des questions fetch pour 1 quiz
  const [questions, setQuestions] = useState();
  const [qWithoutIds, setQWithoutIds] = useState();
  // state pour incrémenter le score
  const [score, setScore] = useState(0);
  // state permettant de mettre à jour la question affichée de façon randomisée
  const [currentQuest, setCurrentQuest] = useState(
    Math.floor(Math.random() * 49)
  );
  // fetch des données
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=50&category=${category}&difficulty=${valueD}&type=multiple`
      )
      .then((res) => setQWithoutIds(res.data.results))
      .catch((err) => {
        err.message();
      });
  }, []);

  // fonction permettant d'ajouter un ID unique à chaque objet.
  function addUniqueIds(array) {
    const newArray = array.map((item, index) => ({
      ...item,
      id: index,
    }));
    setQuestions(newArray);
  }

  useEffect(() => {
    if (qWithoutIds) {
      addUniqueIds(qWithoutIds);
    }
  }, [qWithoutIds]);

  // hook pour naviguer automatiquement vers le board après un délai de 60s
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/gameboard");
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="quizContainer">
      <div className="quizHeader">
        <div className="score">
          <p>Score : {score}</p>
        </div>
        <div className="timer">
          <img
            className="timeIcon"
            src="\assets\Timer_Icon.svg"
            alt="time icon"
          />
          <Timer valueT={valueT} />
        </div>
      </div>

      {questions ? (
        <Question
          currentQuest={currentQuest}
          setCurrentQuest={setCurrentQuest}
          setScore={setScore}
          score={score}
          questions={questions}
          setQuestions={setQuestions}
        />
      ) : (
        <p>Wait please</p>
      )}
    </div>
  );
}

Quiz.propTypes = {
  selectedTimer: PropTypes.objectOf(PropTypes.number),
  selectedDifficulty: PropTypes.objectOf(PropTypes.string),
};

Quiz.defaultProps = {
  selectedTimer: { valueT: 60 },
  selectedDifficulty: { valueD: "Easy" },
};

export default Quiz;
