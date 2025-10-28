import './AuthForm.css'
import { useEffect, useState } from "react"
import { loginUserApi } from "../api/userApi"
import { useAuth } from "../context/UserContext"

export default function LoginForm() {

    const { user, setUser } = useAuth()

    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])


    const loginForm = async (e) => {
        e.preventDefault()
        try {
            const responseData = await loginUserApi({ username, password })
            console.log("user logged in.", responseData.user)
            setUser(responseData.user)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form className="authform" onSubmit={loginForm}>
            <label className="authLabel"> Username:
                <input
                    className="authInput"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label className="authLabel"> Password:
                <input
                    className="authInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
                <button className="authButton">Log in</button>
            </form>
    )
}