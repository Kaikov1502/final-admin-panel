
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "viewer",
    permission: "צופה"
  });

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = async () => {
    await fetch("/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setNewUser({ firstName: "", lastName: "", email: "", role: "viewer", permission: "צופה" });
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const handleSave = async (index) => {
    const user = users[index];
    await fetch("/api/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  };

  return (
    <div style={{ direction: "rtl", maxWidth: 1000, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>ניהול משתמשים</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>שם</th>
            <th>משפחה</th>
            <th>אימייל</th>
            <th>רמת הרשאה</th>
            <th>תפקיד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td><input value={u.firstName} onChange={e => handleChange(i, 'firstName', e.target.value)} /></td>
              <td><input value={u.lastName} onChange={e => handleChange(i, 'lastName', e.target.value)} /></td>
              <td><input value={u.email} onChange={e => handleChange(i, 'email', e.target.value)} /></td>
              <td>
                <select value={u.permission} onChange={e => handleChange(i, 'permission', e.target.value)}>
                  <option>מנהל מערכת</option>
                  <option>מנהל</option>
                  <option>צופה</option>
                </select>
              </td>
              <td><input value={u.role} onChange={e => handleChange(i, 'role', e.target.value)} /></td>
              <td>
                <button onClick={() => handleSave(i)}>שמור</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 40 }}>הוסף משתמש חדש</h3>
      <input placeholder="שם" value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} />
      <input placeholder="שם משפחה" value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} />
      <input placeholder="אימייל" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
      <select value={newUser.permission} onChange={e => setNewUser({ ...newUser, permission: e.target.value })}>
        <option>מנהל מערכת</option>
        <option>מנהל</option>
        <option>צופה</option>
      </select>
      <button onClick={handleAddUser}>הוסף</button>
    </div>
  );
}
