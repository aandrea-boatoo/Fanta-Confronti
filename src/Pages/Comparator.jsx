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
    const { players, getPlayer, handleFavorite, favList } = useContext(GlobalContext);

    //  debounce generale
    const debounce = (callback, delay) => {
        let timer;
        return (value, setFiltered) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value, setFiltered);
            }, delay);
        };
    };

    const debounceSearch = useCallback(
        debounce((setFiltered, value) => {
            const res = players.filter(player =>
                player.title.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered(res);
        }, 300),
        [players]
    );


    // gestione input
    const handleInput1 = (e) => {
        const value = e.target.value;
        setInput1(value);
        debounceSearch(setFiltered1, value);
    };

    const handleInput2 = (e) => {
        const value = e.target.value;
        setInput2(value);
        debounceSearch(setFiltered2, value);
    };

    //gestione giocatore selezionato
    const handleSelect = async (player, setInput, setFiltered, setSelected) => {
        setInput(player.title);
        setFiltered([]);
        const data = await getPlayer(player.id);
        setSelected(data);
    };
    // gestione preferiti
    const handleButton = (selected, setSelected) => {
        handleFavorite(selected.id);
        setSelected(prev => ({
            ...prev, favorite: !prev.favorite
        }))
    }

    const isSame = () => {
        if (!selected1 || !selected2) return false;
        return selected1.id === selected2.id;
    };

    const isPortier = () => {
        const isP1 = selected1?.category === "Portiere";
        const isP2 = selected2?.category === "Portiere";
        return (isP1 && !isP2) || (!isP1 && isP2);
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
                                <li key={player.id} onClick={() => handleSelect(player, setInput1, setFiltered1, setSelected1)}>
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
                                <li key={player.id} onClick={() => handleSelect(player, setInput2, setFiltered2, setSelected2)}>
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
                    <p className="alert">Non puoi confrontare un portiere con un giocatore di movimento</p> :
                    <div className="comparison-table">
                        <div className="player-card">
                            <div className="playerPresentation">
                                <Link to={`/details/${selected1.id}`}>
                                    <img src={selected1.img} alt={selected1.title} />
                                    <h3>{selected1.title}</h3>
                                </Link>
                                <button
                                    className={favList.includes(selected1.id) ? "favorite favoriteButton" : "favoriteButton"}
                                    onClick={() => handleButton(selected1, setSelected1)}
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
                                        <p className="leftStats"><img className="left" src="/imgIcon/golSubitoIcon.png" alt="golSubitiIcon" />{selected1.golSubiti}</p>
                                        <p className="leftStats"><img className="left" src="/imgIcon/cleanSheetIcon.png" alt="cleansheetIcon" />{selected1.cleanSheet}</p>
                                    </> : <>
                                        <p className="leftStats"><img className="left" src="/imgIcon/golIcon.png" alt="gol icon" />{selected1.gol}</p>
                                        <p className="leftStats"><img className="left" src="/imgIcon/assistIcon.png" alt="assist icon" />{selected1.assist}</p>
                                    </>

                                }
                                <p className="leftStats"><img className="left" src="/imgIcon/ammonizioneIcon.png" alt="ammonizioneIcon" />{selected1.ammonizioni}</p>
                                <p className="leftStats"><img className="left" src="/imgIcon/espulsioneIcon.png" alt="EspulsioniIcon" />{selected1.espulsioni}</p>
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
                                        <p className="rightStats">{selected2.golSubiti}<img className="right" src="/imgIcon/golSubitoIcon.png" alt="golSubitiIcon" /></p>
                                        <p className="rightStats">{selected2.cleanSheet}<img className="right" src="/imgIcon/cleanSheetIcon.png" alt="cleansheetIcon" /></p>
                                    </> : <>
                                        <p className="rightStats">{selected2.gol}<img className="right" src="/imgIcon/golIcon.png" alt="gol icon" /></p>
                                        <p className="rightStats">{selected2.assist}<img className="right" src="/imgIcon/assistIcon.png" alt="assist icon" /></p>
                                    </>
                                }
                                <p className="rightStats">{selected2.ammonizioni}<img className="right" src="/imgIcon/ammonizioneIcon.png" alt="ammonizioneIcon" /></p>
                                <p className="rightStats">{selected2.espulsioni}<img className="right" src="/imgIcon/espulsioneIcon.png" alt="EspulsioniIcon" /></p>
                            </div>
                            <div className="playerPresentation">
                                <Link to={`/details/${selected2.id}`}>
                                    <img src={selected2.img} alt={selected2.title} />
                                    <h3>{selected2.title}</h3>
                                </Link>
                                <button
                                    className={favList.includes(selected2.id) ? "favorite favoriteButton" : "favoriteButton"}
                                    onClick={() => handleButton(selected2, setSelected2)}
                                >
                                    &#x2665;
                                </button>
                            </div>

                        </div>
                    </div>
            )
            }
        </div >
    );
}
