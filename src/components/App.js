import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [question, setQuestion] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((items) => setQuestion(items)) 
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestion([...question, newQuestion])
  }

  function handleDelete(newDelete) {
    const newArray = question.filter((questions) => questions.id !== parseInt(newDelete))
    setQuestion(newArray)
  }

  function handlePatch(newPatch) {
    const newArray = [...question]
    const placement = newPatch.id - 1
    newArray.splice(placement, 1, newPatch)
    setQuestion(newArray)
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestion={setQuestion} question={question} onAddQuestion={handleAddQuestion}/> : <QuestionList setQuestion={setQuestion} question={question} onNewDelete={handleDelete} onPatch={handlePatch}/>}
    </main>
  );
}

export default App;
