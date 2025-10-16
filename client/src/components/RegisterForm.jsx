import './AuthForm.css'
import { useState } from 'react'
import { createUserApi } from '../api/userApi'

export default function RegisterForm(){

    const [email, setEmail] = useState([])
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const responseData = await createUserApi({ username, email, password, confirmPassword })
            console.log("User created")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form className="authform" onSubmit={submitForm}>
            <label className="authLabel">
                <input
                    className="authInput"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label className="authLabel">
                <input
                    className="authInput"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label className="authLabel">
                <input
                    className="authInput"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label className="authLabel">
                <input
                    className="authInput"
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button className="authButton">Sign up</button>
        </form>
    )
}