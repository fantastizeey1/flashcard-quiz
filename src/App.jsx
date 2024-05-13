import React, { useState, useEffect, useRef } from "react";
import Flashcardlist from "./components/Flashcardlist";
import axios from "axios";
import logo from "./assets/fantastizeey-logo-trans.png";
import he from "he"; // Import the he library for decoding HTML entities

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        setFlashcards(formatFlashcards(res.data.results));
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  function formatFlashcards(data) {
    return data.map((questionItem, index) => {
      const answer = he.decode(questionItem.correct_answer);
      const options = [
        ...questionItem.incorrect_answers.map((a) => he.decode(a)),
        answer,
      ];
      return {
        id: `${index}-${Date.now()}`,
        question: he.decode(questionItem.question),
        answer: answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!categoryEl.current.value) {
      console.error("Please select a category.");
      return;
    }
    if (
      !amountEl.current.value ||
      amountEl.current.value < 1 ||
      amountEl.current.value > 10
    ) {
      console.error(
        "Please enter a valid number of questions between 1 and 10."
      );
      return;
    }

    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        if (res.data.response_code !== 0) {
          console.error("API Error:", res.data.message);
          return;
        }
        setFlashcards(formatFlashcards(res.data.results));
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }

  return (
    <>
      <form
        className="header flex justify-end items-center flex-col md:justify-between md:flex-row w-full p-[1.5rem]"
        onSubmit={handleSubmit}
      >
        <img src={logo} className="w-[100px] " alt="" />
        <div className="form-group flex justify-center flex-col md:flex-row items-center">
          <label htmlFor="category">Category</label>
          <select
            ref={categoryEl}
            className="rounded-lg m-2 p-1 text-blue-950"
            id="category"
          >
            {categories.map((category) => (
              <option className="p-1" value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group flex justify-center items-center">
          <label htmlFor="amount">Number Of Questions</label>
          <input
            type="number"
            id="amount"
            min={1}
            max={10}
            step={1}
            defaultValue={10}
            ref={amountEl}
            className="rounded p-1 m-2 text-blue-950"
          />
        </div>
        <div className="form-group">
          <button className="btn" type="submit">
            <span>Generate</span>
          </button>
        </div>
      </form>
      <div className="container">
        <Flashcardlist flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
