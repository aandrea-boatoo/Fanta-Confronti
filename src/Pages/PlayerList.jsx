import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

export default function PlayerList() {
    const { players } = useContext(GlobalContext);
    const [filter, setFilter] = useState("");

    if (!players || players.length === 0) {
        return <p>Caricamento dati...</p>;
    }

    const filteredPlayers = filter
        ? players.filter((player) => {
            switch (filter) {
                case "P":
                    return player.category === "Portiere";
                case "D":
                    return player.category === "Difensore";
                case "C":
                    return player.category === "Centrocampista";
                case "A":
                    return player.category === "Attaccante";
                default:
                    return true;
            }
        })
        : players;

    const playerRoule = (player) => {
        let roleClass = "";
        let roleLetter = "";

        switch (player.category) {
            case "Attaccante":
                roleClass = "red circle";
                roleLetter = "A";
                break;
            case "Centrocampista":
                roleClass = "blue circle";
                roleLetter = "C";
                break;
            case "Difensore":
                roleClass = "green circle";
                roleLetter = "D";
                break;
            case "Portiere":
                roleClass = "orange circle";
                roleLetter = "P";
                break;
            default:
                roleClass = "";
                roleLetter = "?";
        }

        return (
            <>
                <td>
                    <p className={roleClass}>{roleLetter}</p>
                </td>
                <td>
                    <Link to={`/details/${player.id}`}>
                        {player.title}
                    </Link>
                </td>
            </>
        );
    };
    const sortedPlayer = filteredPlayers.sort((a, b) => {
        const orderRoule = ["Portiere", "Difensore", "Centrocampista", "Attaccante"]
        const orderA = orderRoule.indexOf(a.category)
        const orderB = orderRoule.indexOf(b.category)
        return orderA - orderB;
    })
    return (
        <div className="listContainer">
            <h2>Trova i tuoi beniamini e confrontali con quelli dei tuoi avversari, avrai azzeccato tutto all'asta?</h2>
            <section className="filter">
                <button onClick={() => setFilter("P")}><p className="orange circle">P</p></button>
                <button onClick={() => setFilter("D")}><p className="green circle">D</p></button>
                <button onClick={() => setFilter("C")}><p className="blue circle">C</p></button>
                <button onClick={() => setFilter("A")}><p className="red circle">A</p></button>
                <button onClick={() => setFilter("")}><p className="white circle">Reset</p></button>
            </section>
            <table>
                <thead>
                    <tr>
                        <th id="role">Ruolo</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPlayer.map((player, index) => (
                        <tr key={index}>
                            {playerRoule(player)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
