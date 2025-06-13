import { NavLink } from "react-router-dom"
export default function Header() {

    return (<header>
        <p><NavLink to="/">Fanta Confronti</NavLink></p>
        <div id="navbar">
            <NavLink to="/playerList">Lista dei Giocatori</NavLink>
            <NavLink to="/compare" >Confronta</NavLink>
        </div>
    </header>
    )
}