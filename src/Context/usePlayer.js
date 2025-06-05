import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env

export default function usePlayer() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/calciatores`)
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(error => console.log(error))
    }, [])

    const getPlayer = async (id) => {
        const response = fetch(`${VITE_API_URL}/calciatores/${id}`, { method: 'GET' });
        const player = (await response).json();
        if (!player) {
            console.error("giocatore non trovato");
        }
        return player
    }

    console.log("Debug Player", players)
    return { players, getPlayer }

}