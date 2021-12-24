import React from "react";

function QuestionItem({ question, setQuestion, onNewDelete, onPatch }) {
  const { id, prompt, answers, correctIndex } = question;
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(event) {
    const deleteId = event.target.parentNode.id

    fetch("http://localhost:4000/questions/" + deleteId, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => onNewDelete(deleteId))
  }

  function handleChange(event) {
    const patch = parseInt(event.target.value)
    const patchId = event.target.parentNode.parentNode.id
    
    fetch(`http://localhost:4000/questions/` + patchId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: patch
      }),
    })
    .then((r) => r.json())
    .then((updatedItem) => onPatch((updatedItem)))
  }

  return (
    <li id={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
