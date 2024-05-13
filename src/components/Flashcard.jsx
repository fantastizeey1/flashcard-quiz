import React, { useState } from "react";
import "./app.css";

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <div className="card-container">
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={handleClick} // Use handleClick directly in onClick
      >
        <div className="front">
          {flashcard.question}
          <div className="options">
            {flashcard.options.map((option, index) => (
              <div className="option" key={index}>
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="back">{flashcard.answer}</div>
      </div>
    </div>
  );
}

export default Flashcard;
