import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";

export default function DetailPlayer() {
    const { id } = useParams();
    const { getPlayer, handleFavorite, singlePlayer, } = useContext(GlobalContext);
    useEffect(() => {
        getPlayer(id);
    }, [id]);




    if (!singlePlayer) {
        return <p>Caricamento giocatore...</p>;
    }
    const isPortier = singlePlayer.category === "Portiere" ?
        <>
            <p><img src="/imgIcon/golSubitoIcon.png" alt="golSubitiIcon" /><strong>Gol Subiti:</strong>{singlePlayer.golSubiti}</p>
            <p><img src="/imgIcon/cleanSheetIcon.png" alt="cleansheetIcon" /><strong>Cleansheet:</strong> {singlePlayer.cleanSheet}</p>
        </> : <>
            <p><img src="/imgIcon/golIcon.png" alt="gol icon" /><strong>Gol:</strong> {singlePlayer.gol}</p>
            <p><img src="/imgIcon/assistIcon.png" alt="assist icon" /><strong>Assist:</strong> {singlePlayer.assist}</p>
        </>;

    return (<>
        <h1>{singlePlayer.title}</h1>
        <div className="detailsContainer">
            <div className="imgContainer">
                <img src={singlePlayer.img} alt={singlePlayer.title} />
            </div>
            <section className="stats">

                <p><strong>Età:</strong> {singlePlayer.age}</p>
                <p><strong>Ruolo:</strong>{singlePlayer.category}</p>
                <p><strong>Partite Giocate:</strong>{singlePlayer.partiteGiocate}</p>
                <p><strong>Media FantaVoto:</strong>{singlePlayer.mediaFantaVoto}</p>
                <p><strong>Sufficienze:</strong>{singlePlayer.sufficienze}</p>
                {isPortier}
                <p><img src="/imgIcon/ammonizioneIcon.png" alt="ammonizioneIcon" /><strong>Ammonizioni:</strong>{singlePlayer.ammonizioni}</p>
                <p><img src="/imgIcon/espulsioneIcon.png" alt="EspulsioniIcon" /><strong>Espulsioni:</strong>{singlePlayer.espulsioni}</p>
                <p><button className={singlePlayer.favorite ? "favorite" : ""} onClick={() => handleFavorite(id)}>
                    <strong>{singlePlayer.favorite ? "Rimuovi" : "Aggiungi"} ai preferiti</strong>
                </button></p>
            </section>
        </div>
    </>
    );
}
