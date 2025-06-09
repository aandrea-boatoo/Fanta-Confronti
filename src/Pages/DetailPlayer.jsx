import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function DetailPlayer() {
    const { id } = useParams();
    const { getPlayer, updatePlayer } = useContext(GlobalContext);

    const [player, setPlayer] = useState(null);

    const handleFavorite = () => {
        const newPlayer = { ...player, favorite: !player.favorite };
        setPlayer(newPlayer)
        updatePlayer(newPlayer);
        console.log(message)
        console.log("Bottone CLickato, new player:", newPlayer)
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            const data = await getPlayer(id);
            setPlayer(data.calciatore);
        };
        fetchPlayer();
        console.log(player);
    }, [id, getPlayer]);

    if (!player) {
        return <p>Caricamento giocatore...</p>;
    }
    const isPortier = player.category === "Portiere" ?
        <>
            <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/golSubito.png" alt="golSubitiIcon" /><strong>Gol Subiti:</strong>{player.golSubiti}</p>
            <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/portiereImbattuto.png" alt="cleansheetIcon" /><strong>Cleansheet:</strong> {player.cleanSheet}</p>
        </> : <>
            <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/golFatto.png" alt="gol icon" /><strong>Gol:</strong> {player.gol}</p>
            <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/assist.png" alt="assist icon" /><strong>Assist:</strong> {player.assist}</p>
        </>;

    const isFavorite = player.favorite ? "favorite" : ""
    const handleAdd = player.favorite ? "Rimuovi" : "Aggiungi"
    return (<>
        <h1>{player.title}</h1>
        <div className="detailsContainer">
            <div className="imgContainer">
                <img src={player.img} alt={player.title} />
            </div>
            <section className="stats">

                <p><strong>Età:</strong> {player.age}</p>
                <p><strong>Ruolo:</strong>{player.category}</p>
                <p><strong>Partite Giocate:</strong>{player.partiteGiocate}</p>
                <p><strong>Media FantaVoto:</strong>{player.mediaFantaVoto}</p>
                <p><strong>Sufficienze:</strong>{player.sufficienze}</p>
                {isPortier}
                <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/ammonito.png" alt="ammonizioneIcon" /><strong>Ammonizioni:</strong>{player.ammonizioni}</p>
                <p><img src="https://content.fantacalcio.it/web/img/live_ico/2021/espulso.png" alt="EspulsioniIcon" /><strong>Espulsioni:</strong>{player.espulsioni}</p>
                <p><button className={isFavorite} onClick={handleFavorite}><strong>{handleAdd} ai preferiti</strong></button></p>
            </section>
        </div>
    </>
    );
}
