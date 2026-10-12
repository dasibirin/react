import { useState } from 'react'

// קומפוננטת טופס — קולטת שם משימה מהמשתמש ומעבירה אותו לאב דרך onAdd
function TaskForm({ onAdd }) {
  // state מקומי — חי רק בתוך הטופס, מחזיק את הטקסט שהמשתמש מקליד
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // מונע רענון של הדף בטופס

    const trimmed = text.trim()
    if (trimmed === '') return // לא מוסיפים משימה ריקה

    onAdd(trimmed) // קריאה לפונקציה של האב — "האירוע עולה למעלה"
    setText('') // איפוס השדה
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="הקלד משימה חדשה..."
        aria-label="שם משימה חדשה"
      />
      <button type="submit">הוסף</button>
    </form>
  )
}

export default TaskForm
