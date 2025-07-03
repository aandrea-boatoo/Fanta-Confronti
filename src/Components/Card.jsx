import { useContext, useEffect, useState, } from "react"
import { Link } from "react-router-dom"
import { memo } from "react"
import { GlobalContext } from "../Context/GlobalContext"

const Card = ({ player }) => {
    const { getPlayer, handleFavorite, favList } = useContext(GlobalContext);
    const [favPlayer, setFavPlayer] = useState(null);
    useEffect(() => {
        const fetchPlayer = async () => {
            const data = await getPlayer(player.id);
            setFavPlayer(data);
        };
        fetchPlayer();
    }, [player.id, getPlayer])
    console.log(favPlayer)
    if (!favPlayer) {
        return <p>Caricamento giocatore...</p>;
    }
    const rouleStats = (roulePlayer) => {
        switch (roulePlayer.category) {
            case "Portiere":
                return <>
                    <p className="mainStats"><img className="icon" src="/imgIcon/golSubitoIcon.png" alt="golSubitiIcon" />{roulePlayer.golSubiti}</p>
                    <p className="mainStats"><img className="icon" src="/imgIcon/cleanSheetIcon.png" alt="cleansheetIcon" />{roulePlayer.cleanSheet}</p>
                </>;
            case "Difensore":
                return <>
                    <p className="mainStats"><img className="icon" src="/imgIcon/mediaVotoIcon.png" alt="mediaVotoIcon" /> {roulePlayer.mediaFantaVoto}</p>
                    <p className="mainStats"><img className="icon" src="/imgIcon/sufficienzaIcon.png" alt="sufficienzeIcon" /> {roulePlayer.sufficienze}</p>
                </>
            case "Centrocampista":
                return <>
                    <p className="mainStats"><img className="icon" src="/imgIcon/golIcon.png" alt="gol icon" />{roulePlayer.gol}</p>
                    <p className="mainStats"><img className="icon" src="/imgIcon/assistIcon.png" alt="assist icon" />{roulePlayer.assist}</p>
                </>
            case "Attaccante":
                return <>
                    <p className="mainStats"><img className="icon" src="/imgIcon/golIcon.png" alt="gol icon" />{roulePlayer.gol}</p>
                    <p className="mainStats"><img className="icon" src="/imgIcon/assistIcon.png" alt="assist icon" />{roulePlayer.assist}</p>
                </>
            default: return <></>;
        }
    }
    return (
        <>
            <div className="playerCard">
                <Link to={`/details/${favPlayer.id}`}>
                    <img src={favPlayer.img} alt={favPlayer.title} />
                </Link>
                <div className="favPlayerStats">
                    <p className="mainStats"><img className="icon" src="/imgIcon/tickIcon.png" alt="tickIcon" />{favPlayer.partiteGiocate}</p>
                    {rouleStats(favPlayer)}
                    <p className="mainStats"><img className="icon" src="/imgIcon/ammonizioneIcon.png" alt="ammonizioneIcon" />{favPlayer.ammonizioni}</p>
                    <p className="mainStats"><img className="icon" src="/imgIcon/espulsioneIcon.png" alt="EspulsioniIcon" />{favPlayer.espulsioni}</p>
                </div>
                <button
                    className={favList.includes(favPlayer.id) ? "favorite favoriteButton" : "favoriteButton"}
                    onClick={() => handleFavorite(player.id)}
                >
                    Rimuovi
                </button>
            </div>
        </>
    )
}

export default memo(Card);