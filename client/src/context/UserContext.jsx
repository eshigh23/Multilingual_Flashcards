import { createContext, useContext, useEffect, useState } from 'react'
import { fetchUserApi } from '../api/userApi'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await fetchUserApi()
                setUser(responseData.user)

            } catch (e) {
                console.error(e)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        console.log("user in authcontext:", user)
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useAuth() {
    return useContext(UserContext)
}