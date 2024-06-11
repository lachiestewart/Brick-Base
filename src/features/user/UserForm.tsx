import React from 'react'

const UserForm = () => {
    return (
        <div>
            <h1>Create New User</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default UserForm