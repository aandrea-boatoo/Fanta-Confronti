import { NavLink } from "react-router-dom"
import App from "../App"
export default function Header() {

    return (<header>
        <p>Fanta-Confronti</p>
        <div id="navbar">
            <NavLink to="/">Lista dei Giocatori</NavLink>
            <NavLink to="/compare" >Confronta</NavLink>
        </div>
    </header>
    )
}