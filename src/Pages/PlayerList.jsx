import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

export default function PlayerList() {
    const { players, handleFavorite } = useContext(GlobalContext);
    const [filter, setFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const debounce = (callback, delay) => {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value);
            }, delay);
        };
    };

    const debounceSearch = useCallback(debounce(setSearchQuery, 500), []);

    const filteredPlayers = useMemo(() => {
        const byRole = filter
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

        const bySearch = searchQuery
            ? byRole.filter(player =>
                player.title.toLowerCase().includes(searchQuery.toLowerCase()))
            : byRole;

        return bySearch;
    }, [players, filter, searchQuery]);

    const sortedPlayers = useMemo(() => {
        const orderRoule = ["Portiere", "Difensore", "Centrocampista", "Attaccante"];
        return [...filteredPlayers].sort((a, b) => {
            return orderRoule.indexOf(a.category) - orderRoule.indexOf(b.category);
        });
    }, [filteredPlayers]);

    if (!players || players.length === 0) {
        return <p>Caricamento dati...</p>;
    }
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
                <td><p className={roleClass}>{roleLetter}</p></td>
                <td><Link to={`/details/${player.id}`}>{player.title}</Link></td>
                <td>
                    <button
                        className={`${player.favorite ? "favorite" : ""} favoriteButton`}
                        onClick={() => handleFavorite(player.id)}
                    >
                        &#x2665;
                    </button>
                </td>

            </>
        );
    };

    return (
        <div className="listContainer">
            <h2>Trova i tuoi beniamini e confrontali con quelli dei tuoi avversari, avrai azzeccato tutto all'asta?</h2>
            <section className="filter">
                <input type="text" onChange={(e) => debounceSearch(e.target.value)} placeholder="Cerca il tuo giocatore..." />
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPlayers.map((player, index) => (
                        <tr key={index}>
                            {playerRoule(player)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
