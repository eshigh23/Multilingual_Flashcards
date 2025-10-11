import './Navbar.css'
import { CircleUserRound, Menu } from 'lucide-react'

export default function Navbar(){
    return (
        <div className="navbar">
            <h3>Logo</h3>
            <div className="navbar--icons mobile--only">
                <CircleUserRound size={25} color={'black'}/>
                <Menu size={25} color={'black'}/>
            </div>
            <div className="navbar--icons desktop--only">
                <CircleUserRound size={25} color={'black'}/>
                <p>Login/Signup</p>
            </div>
        </div>
    )
}