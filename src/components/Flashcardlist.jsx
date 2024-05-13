import React from "react";
import Flashcard from "./Flashcard";

function Flashcardlist({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
}

export default Flashcardlist;
