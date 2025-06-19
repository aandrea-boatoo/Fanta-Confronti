import { useState, useEffect, useCallback } from "react";
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
    // Aggiorna solo il campo `favorite`
    const updatePlayer = useCallback(async (updatedPlayer) => {
        try {
            const response = await fetch(`${VITE_API_URL}/calciatores/${updatedPlayer.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorite: updatedPlayer.favorite }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Errore nell'aggiornamento:", error);
        }
    });

    // Toggle del preferito
    const handleFavorite = async (id) => {
        const playerToUpdate = players.find(p => p.id === parseInt(id));
        if (!playerToUpdate) return;

        const updatedFavorite = !playerToUpdate.favorite;

        // Aggiorna solo la proprietà favorite
        const updateResponse = await updatePlayer({ id: playerToUpdate.id, favorite: updatedFavorite });

        if (!updateResponse) {
            console.error("Aggiornamento fallito");
            return;
        }
        // carica i dati del giocatore aggiornato
        const refreshedPlayer = await getPlayer(playerToUpdate.id);

        if (!refreshedPlayer) {
            console.error("Recupero giocatore aggiornato fallito");
            return;
        }

        setPlayers(prevPlayers =>
            prevPlayers.map(p => p.id === refreshedPlayer.id ? refreshedPlayer : p)
        );

        if (singlePlayer?.id === refreshedPlayer.id) {
            setSinglePlayer(refreshedPlayer);
        }
    };

    return {
        players,
        singlePlayer,
        getPlayer,
        handleFavorite,
    };
}
