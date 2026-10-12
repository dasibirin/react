import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'

// הערך ההתחלתי של המשימות — משמש רק כנקודת פתיחה ל-state
const INITIAL_TASKS = [
  { id: 1, title: 'משימה 1', status: 'הושלם' },
  { id: 2, title: 'משימה 2', status: 'בתהליך' },
  { id: 3, title: 'משימה 3', status: 'ממתין' },
  { id: 4, title: 'משימה 4', status: 'הושלם' },
  { id: 5, title: 'משימה 5', status: 'ממתין' },
]

const USER = {
  name: 'שם מלא 1',
  role: 'תפקיד 1',
}

// סדר הסטטוסים — משמש לקידום סטטוס בלחיצה
const STATUS_ORDER = ['ממתין', 'בתהליך', 'הושלם']

// מחזיר את הסטטוס הבא בתור (ומחזיר לראש בסוף המחזור)
function nextStatus(current) {
  const index = STATUS_ORDER.indexOf(current)
  return STATUS_ORDER[(index + 1) % STATUS_ORDER.length]
}

function App() {
  // מערך המשימות עבר מ"קבוע" ל-state — מעתה React יזהה כל שינוי ויצייר מחדש
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  // הוספת משימה חדשה — בונה מערך חדש במקום לשנות את הקיים (immutable update)
  function handleAdd(title) {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(), // מזהה ייחודי
        title,
        status: 'ממתין',
      },
    ])
  }

  // מחיקת משימה לפי id — filter בונה מערך חדש בלי הנמחק
  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // קידום סטטוס המשימה במחזוריות: ממתין → בתהליך → הושלם → ממתין
  function handleToggleStatus(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: nextStatus(task.status) } : task
      )
    )
  }

  return (
    <main className="container">
      {/* העברת פרטי הכותרת לקומפוננטת הבן */}
      <Header title="כותרת" userName={USER.name} userRole={USER.role} />

      {/* העברת פונקציית ההוספה — הבן יקרא לה כשלוחצים "הוסף" */}
      <TaskForm onAdd={handleAdd} />

      {/* העברת המשימות ופונקציות המחיקה ושינוי הסטטוס */}
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* העברת מערך המשימות מתוך ה-state */}
      <TaskSummary tasks={tasks} />
    </main>
  )
}

export default App
