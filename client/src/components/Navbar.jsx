import './Navbar.css'
import { CircleUserRound, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export default function Navbar(){

    const navigate = useNavigate()

    const navigateToAuthPage = () => {
        navigate('/auth')
    }

    const navigateToHome = () => {
        navigate('/home')
    }
    return (
        <div className="navbar">
            <div className="navbar--logo">
                <p onClick={navigateToHome}>Logo</p>
            </div>
            <div className="navbar--icons mobile--only">
                <CircleUserRound
                    onClick={navigateToAuthPage}
                    size={25} color={'black'}/>
                <Menu size={25} color={'black'}/>
            </div>
            <div 
                className="navbar--icons desktop--only"
                onClick={navigateToAuthPage}
            >
                <CircleUserRound size={22} color={'black'}/>
                <p>Login/Signup</p>
            </div>
        </div>
    )
}