import axios from "axios"
import { useState } from "react"

const RegisterForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        axios.post('http://localhost:3000/users/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
            .then(res => {
                setEmail('')
                setPassword('')
                setFirstName('')
                setLastName('')
                console.log(res.data)
            })
            .catch(error => {
                console.error('Error:', error)
                setPassword('')
            })
    }

    return (
        <div className="tw-flex tw-flex-col tw-gap-2 tw-w-1/2">
            <div>RegisterForm</div>
            <label htmlFor="firstName">First Name</label>
            <input id='firstName' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <label htmlFor="lastName">Last Name</label>
            <input id='lastName' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Register</button>
        </div>
    )
}

export default RegisterForm