import React from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList({question, setQuestion, onNewDelete, onPatch}) {
  
  function questionMake() {
    if (question !== "") {
      return question.map((questions) => <QuestionItem key={questions.id} question={questions} setQuestion={setQuestion} onNewDelete={onNewDelete} onPatch={onPatch}/>)
    } else {
    return "...Loading"
  }
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMake()}</ul>
    </section>
  );
}

export default QuestionList;
