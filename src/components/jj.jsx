import React, { useState } from "react";

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <div className="card-container">
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="front">
          {flashcard.question}
          <div className="options">
            {flashcard.options.map((option) => {
              return <div className="option">{option}</div>;
            })}
          </div>
        </div>
        <div className="back">{flashcard.answer}</div>
      </div>
    </div>
  );
}

export default Flashcard;
{
  id: 1,
  question: "what is 2 + 2 ?",
  answer: "4",
  options: ["2", "4", "3", "5"],
},
{
  id: 2,
  question: "what is 2 + 3 ?",
  answer: "5",
  options: ["2", "4", "3", "5"],
},
