import { useEffect, useState } from 'react'
import { createUserApi, loginUserApi } from '../api/userApi'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default function AuthPage() {
    

    return (
        <div>
            <h3>Signup</h3>
            <RegisterForm />
            
            <h3>Login</h3>
            <LoginForm />
             
        </div>
    )
}