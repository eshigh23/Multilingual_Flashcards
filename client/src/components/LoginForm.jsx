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
            setUser(useAuth)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={loginForm}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Submit</button>
            </form>
    )
}