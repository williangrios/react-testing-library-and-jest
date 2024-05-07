import React from 'react'

function UserList({ users }) {
  return (
    <div>
      <h2>Users List</h2>
      <table>
        <thead>
          <td>Name</td>
          <td>Email</td>
        </thead>
        <tbody data-testid="users">
          {users.map((user) => {
            return (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
