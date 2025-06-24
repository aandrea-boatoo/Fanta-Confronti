import { useState, useEffect, useCallback } from "react";
import useStorage from "./useStorage";
const { VITE_API_URL } = import.meta.env;
export default function usePlayer() {
    const [players, setPlayers] = useState([]);
    const [singlePlayer, setSinglePlayer] = useState(null);

    // Carica tutti i giocatori
    useEffect(() => {
        fetch(`${VITE_API_URL}/calciatores`)
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(error => console.log("Errore nel caricamento giocatori:", error));
    }, []);

    // Prendi un giocatore singolo
    const getPlayer = useCallback(async (id) => {
        try {
            const response = await fetch(`${VITE_API_URL}/calciatores/${id}`);
            const data = await response.json();
            if (!data || !data.calciatore) {
                console.error("Giocatore non trovato");
                return null;
            }
            setSinglePlayer(data.calciatore);
            return data.calciatore;
        } catch (error) {
            console.error("Errore nel fetch del giocatore:", error);
            return null;
        }
    }, [])
        ;
    // Toggle del preferito
    const [favList, setFavList] = useStorage("favorite", []);
    const handleFavorite = async (id) => {
        favList.includes(id) ?
            setFavList(favList.filter(item => item !== id)) :
            setFavList([...favList, id]);

    }
    return {
        players,
        singlePlayer,
        favList,
        getPlayer,
        handleFavorite,
    };
}
