import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function DetailPlayer() {
    const { id } = useParams();
    const { getPlayer } = useContext(GlobalContext);

    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            const data = await getPlayer(id); // aspetta che la promise venga risolta
            setPlayer(data.calciatore); // salva nei dati nello stato
        };
        fetchPlayer();
        console.log(player);
    }, [id, getPlayer]);

    if (!player) {
        return <p>Caricamento giocatore...</p>;
    }

    return (
        <>
            <h3>{player.title}</h3>
            <img src={player.img} alt={player.title} />
        </>
    );
}
