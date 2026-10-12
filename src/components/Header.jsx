// קומפוננטת כותרת — מקבלת פרטי משתמש דרך props ומציגה אותם
function Header({ title, userName, userRole }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="header-user">
        {userName} — {userRole}
      </p>
    </header>
  )
}

export default Header
