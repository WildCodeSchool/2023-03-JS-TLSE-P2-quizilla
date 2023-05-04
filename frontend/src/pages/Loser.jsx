import "./Winner.css";
import "./GameBoard";
import PropTypes from "prop-types";
import { LabelsL } from "../components/Utils";

const RedirectHome = () => {
  window.location.replace("/");
};
function Loser({ totalScore }) {
  Loser.propTypes = {
    totalScore: PropTypes.number.isRequired,
  };
  return (
    <section className="winnerBody">
      <section className="winnerBlockText">
        <p className="winnerMessage">NOOb !!</p>
        <p className="winnerComment">
          Whatever your name, you will always be a NoobZilla
        </p>
      </section>
      <div className="labelScore">{`Score total : ${totalScore}`}</div>
      <section className="resultBody">
        <ul className="resultUl">
          {LabelsL.map((label) => (
            <li
              key={label.id}
              className={
                label.points >= totalScore ? "normalLabel" : "highScoreLabel"
              }
            >{`${label.name} ${label.points}`}</li>
          ))}
        </ul>
      </section>
      <section>
        <button className="newGame" type="button" onClick={RedirectHome}>
          New Game
        </button>
      </section>
    </section>
  );
}

export default Loser;
