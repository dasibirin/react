// קומפוננטת סיכום — מחשבת ומציגה כמה משימות יש וכמה הושלמו
function TaskSummary({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.status === 'הושלם').length

  return (
    <section className="task-summary">
      <p>
        יש {total} משימות, מתוכן {completed} הושלמו.
      </p>
    </section>
  )
}

export default TaskSummary
