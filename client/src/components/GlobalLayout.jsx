import './GlobalLayout.css'
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function GlobalLayout() {
    return(
        <div className="global-layout">
            <header className="navbar--wrapper">
                <Navbar/>
            </header>
            <main className="content">
                <Outlet/>
            </main>
        </div>
    )
}