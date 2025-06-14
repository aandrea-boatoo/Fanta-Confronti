import { useState, useContext, useCallback } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

export default function Comparator() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [filtered1, setFiltered1] = useState([]);
    const [filtered2, setFiltered2] = useState([]);
    const [selected1, setSelected1] = useState(null);
    const [selected2, setSelected2] = useState(null);
    const { players, getPlayer, handleFavorite } = useContext(GlobalContext);

    // Funzione debounce
    const debounce = (callback, delay) => {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value);
            }, delay);
        };
    };

    const debounceSearch1 = useCallback(
        debounce((value) => {
            const res = players.filter(player =>
                player.title.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered1(res);
        }, 300),
        [players]
    );

    const debounceSearch2 = useCallback(
        debounce((value) => {
            const res = players.filter(player =>
                player.title.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered2(res);
        }, 300),
        [players]
    );



    // Input handlers
    const handleInput1 = (e) => {
        const value = e.target.value;
        setInput1(value);
        debounceSearch1(value);
    };

    const handleInput2 = (e) => {
        const value = e.target.value;
        setInput2(value);
        debounceSearch2(value);
    };

    // Click handlers
    const handleSelect1 = async (player) => {
        setInput1(player.title);
        setFiltered1([]);
        const data = await getPlayer(player.id);
        setSelected1(data);
        console.log(selected1)
    };

    const handleSelect2 = async (player) => {
        setInput2(player.title);
        setFiltered2([]);
        const data = await getPlayer(player.id);
        setSelected2(data);
        console.log(selected2)
    };

    const handleButton1 = () => {
        handleFavorite(selected1.id);
        setSelected1(prev => ({
            ...prev, favorite: !prev.favorite
        }))
    }
    const handleButton2 = () => {
        handleFavorite(selected2.id);
        setSelected2(prev => ({
            ...prev, favorite: !prev.favorite
        }))
    }

    const isSame = () => {
        const idPl1 = selected1.id;
        const idPl2 = selected2.id;
        return (idPl1 === idPl2)

    }
    const isPortier = () => {
        const isP1 = selected1?.category === "Portiere";
        const isP2 = selected2?.category === "Portiere";
        return (isP1 && isP2) || (!isP1 && !isP2);
    }

    return (
        <div className="comparator-container">
            <h2>Dubbi che non ti fanno dormire la notte? Abbiamo la soluzione</h2>
            <div className="search-section">
                <div className="player-search">
                    <input className="filterInput"
                        type="text"
                        placeholder="Cerca giocatore 1..."
                        value={input1}
                        onChange={handleInput1}
                        onFocus={(e) => e.target.select()}
                    />
                    {filtered1.length > 0 && (
                        <ul className="suggestion-list">
                            {filtered1.map(player => (
                                <li key={player.id} onClick={() => handleSelect1(player)}>
                                    {player.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="player-search">
                    <input className="filterInput"
                        type="text"
                        placeholder="Cerca giocatore 2..."
                        value={input2}
                        onChange={handleInput2}
                        onFocus={(e) => e.target.select()}
                    />
                    {filtered2.length > 0 && (
                        <ul className="suggestion-list">
                            {filtered2.map(player => (
                                <li key={player.id} onClick={() => handleSelect2(player)}>
                                    {player.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {selected1 && selected2 && (isSame() ?
                <p className="alert">Non puoi scegliere lo stesso giocatore due volte per il confronto</p>
                :
                isPortier() ?
                    <div className="comparison-table">
                        <div className="player-card">
                            <div className="playerPresentation">
                                <img src={selected1.img} alt={selected1.title} />
                                <h3><Link to={`/details/${selected1.id}`}>{selected1.title}</Link></h3>
                                <button
                                    className={selected1.favorite ? "favorite favoriteButton" : "favoriteButton"}
                                    onClick={() => handleButton1()}
                                >
                                    &#x2665;
                                </button>
                            </div>

                            <div className="playerStats">

                                <p className="leftStats"><img className="left" src="/imgIcon/calendarIcon.png" alt="calendarIcon" />{selected1.age}</p>
                                <p className="leftStats"><img className="left" src="/imgIcon/tickIcon.png" alt="tickIcon" />{selected1.partiteGiocate}</p>
                                <p className="leftStats"><img className="left" src="/imgIcon/mediaVotoIcon.png" alt="mediaVotoIcon" /> {selected1.mediaFantaVoto}</p>
                                {selected1.category === "Portiere" ?
                                    <>
                                        <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/golSubito.png" alt="golSubitiIcon" />{selected1.golSubiti}</p>
                                        <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/portiereImbattuto.png" alt="cleansheetIcon" />{selected1.cleanSheet}</p>
                                    </> : <>
                                        <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/golFatto.png" alt="gol icon" />{selected1.gol}</p>
                                        <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/assist.png" alt="assist icon" />{selected1.assist}</p>
                                    </>

                                }
                                <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/ammonito.png" alt="ammonizioneIcon" />{selected1.ammonizioni}</p>
                                <p className="leftStats"><img className="left" src="https://content.fantacalcio.it/web/img/live_ico/2021/espulso.png" alt="EspulsioniIcon" />{selected1.espulsioni}</p>
                            </div>
                        </div>
                        <div className="statsName">
                            <p>Anni</p>
                            <p>Partite</p>
                            <p>Media FantaVoto</p>
                            {selected2.category === "Portiere" ?
                                <>
                                    <p>Gol Subiti</p>
                                    <p>Cleansheet</p>
                                </> : <>
                                    <p>Gol</p>
                                    <p>Assist</p>
                                </>
                            }
                            <p>Ammonizioni</p>
                            <p>Espulsioni</p>
                        </div>
                        <div className="player-card">
                            <div className="playerStats">

                                <p className="rightStats">{selected2.age}<img className="right" src="/imgIcon/calendarIcon.png" alt="calendarIcon" /></p>
                                <p className="rightStats">{selected2.partiteGiocate}<img className="right" src="/imgIcon/tickIcon.png" alt="tickIcon" /></p>
                                <p className="rightStats">{selected2.mediaFantaVoto}<img className="right" src="/imgIcon/mediaVotoIcon.png" alt="mediaVotoIcon" /></p>
                                {selected2.category === "Portiere" ?
                                    <>
                                        <p className="rightStats">{selected2.golSubiti}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/golSubito.png" alt="golSubitiIcon" /></p>
                                        <p className="rightStats">{selected2.cleanSheet}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/portiereImbattuto.png" alt="cleansheetIcon" /></p>
                                    </> : <>
                                        <p className="rightStats">{selected2.gol}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/golFatto.png" alt="gol icon" /></p>
                                        <p className="rightStats">{selected2.assist}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/assist.png" alt="assist icon" /></p>
                                    </>
                                }
                                <p className="rightStats">{selected2.ammonizioni}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/ammonito.png" alt="ammonizioneIcon" /></p>
                                <p className="rightStats">{selected2.espulsioni}<img className="right" src="https://content.fantacalcio.it/web/img/live_ico/2021/espulso.png" alt="EspulsioniIcon" /></p>
                            </div>
                            <div className="playerPresentation">
                                <img src={selected2.img} alt={selected2.title} />
                                <h3><Link to={`/details/${selected2.id}`}>{selected2.title}</Link></h3>
                                <button
                                    className={selected2.favorite ? "favorite favoriteButton" : "favoriteButton"}
                                    onClick={() => handleButton2()}
                                >
                                    &#x2665;
                                </button>
                            </div>

                        </div>
                    </div> :
                    <p className="alert">Non puoi confrontare un portiere con un giocatore di movimento</p>
            )
            }
        </div >
    );
}
