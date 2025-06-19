import { useEffect, useContext, useState, useMemo, useRef } from "react";
import PlayerRow from "../Components/PlayerRow";
import { GlobalContext } from "../Context/GlobalContext";
export default function PlayerList() {
    const { players, handleFavorite } = useContext(GlobalContext);
    const [filter, setFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const debounceTimer = useRef(null)



    const debounceInput = (value) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current)
        }
        debounceTimer.current = setTimeout(() => {
            setSearchQuery(value);
        }, 500)
    };
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current)
            }
        }
    }, []);

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
    const alphaSortedPlayer = useMemo(() => ([...filteredPlayers].sort((a, b) => (a.title.localeCompare(b.title)))), [filteredPlayers]);
    const sortedPlayers = useMemo(() => {
        const orderRoule = ["Portiere", "Difensore", "Centrocampista", "Attaccante"];
        return [...alphaSortedPlayer].sort((a, b) => {
            return orderRoule.indexOf(a.category) - orderRoule.indexOf(b.category);
        });
    }, [filteredPlayers]);

    if (!players || players.length === 0) {
        return <p>Caricamento dati...</p>;
    }

    return (
        <div className="listContainer">
            <h2>Trova i tuoi beniamini e confrontali con quelli dei tuoi avversari, avrai azzeccato tutto all'asta?</h2>
            <section className="filter">
                <input type="text" onChange={(e) => debounceInput(e.target.value)} placeholder="Cerca il tuo giocatore..." />
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
                        <PlayerRow
                            key={player.id}
                            player={player}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
