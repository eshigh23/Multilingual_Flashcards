import './Authpage.css'
import { useEffect, useState } from 'react'
import { createUserApi, loginUserApi } from '../api/userApi'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default function AuthPage() {

    const [isLogin, setIsLogin] = useState(true)
    

    return (
        <div className="authpage">
            <div className="authpage--headers">
                <div className="authpage--headers-wrapper">
                    <p 
                        onClick={() => setIsLogin(true)}>Login
                    </p>
                    <div className={`${isLogin ? 'authpage--active' : ''}`}></div>
                </div>
                <div className="authpage--headers-wrapper">
                    <p 
                        onClick={() => setIsLogin(false)}>Signup
                    </p>
                    <div className={`${!isLogin ? 'authpage--active' : ''}`}></div>
                </div>
            </div>
            { isLogin ? (
                <LoginForm />
            ):(
                <RegisterForm />
            )}
        </div>
    )
}