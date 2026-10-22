// קומפוננטת רשימת משימות — מציגה שם וסטטוס, ומאפשרת מחיקה ושינוי סטטוס
function TaskList({ tasks, onDelete, onToggleStatus }) {
  return (
    <section className="task-list">
      <h2>רשימת משימות</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-title">{task.title}</span>
            {/* לחיצה על הסטטוס מקדמת אותו למצב הבא */}
            <button
              type="button"
              className={`task-status status-${statusClass(task.status)}`}
              onClick={() => onToggleStatus(task.id)}
              title="לחץ לשינוי הסטטוס"
            >
              {task.status}
            </button>
            {/* עטיפה בפונקציה — כדי שלא תיקרא מיד בזמן הציור */}
            <button
              type="button"
              className="task-delete"
              onClick={() => onDelete(task.id)}
              aria-label={`מחק את ${task.title}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

// מיפוי טקסט הסטטוס למחלקת CSS (ללא תלות בטקסט עצמו)
function statusClass(status) {
  if (status === 'הושלם') return 'done'
  if (status === 'בתהליך') return 'progress'
  return 'pending'
}

export default TaskList
