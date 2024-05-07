import React, { useState } from 'react'

function UserForm({ onUserAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onUserAdd({
      name,
      email,
    })
    setName('')
    setEmail('')
  }

  return (
    <div>
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <button>Add User</button>
      </form>
    </div>
  )
}

export default UserForm
