import { useContext, useState, useMemo, useCallback, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import Card from "../Components/Card";
export default function PlayerList() {
    const { players, favList } = useContext(GlobalContext);

    const favoritePlayerList = players.filter(p => favList.includes(p.id));

    const portieriList = favoritePlayerList.filter(p => p.category === "Portiere");
    const difensoriList = favoritePlayerList.filter(p => p.category === "Difensore");
    const centrocampistiList = favoritePlayerList.filter(p => p.category === "Centrocampista");
    const attaccantiList = favoritePlayerList.filter(p => p.category === "Attaccante");

    const portieriCards = portieriList.length === 0 ?
        <p className="alertNoCards">nessun portiere tra i preferiti</p> :
        portieriList.map((player, index) => (
            <Card
                key={index}
                player={player}
            />
        ))

    const difensoriCards = difensoriList.length === 0 ?
        <p className="alertNoCards">nessun difensore tra i preferiti</p> :
        difensoriList.map((player, index) => (
            <Card
                key={index}
                player={player}
            />
        ))

    const centrocampistiCards = centrocampistiList.length === 0 ?
        <p className="alertNoCards">nessun centrocampista tra i preferiti</p> :
        centrocampistiList.map((player, index) => (
            <Card
                key={index}
                player={player}
            />
        ))

    const attaccantiCards = attaccantiList.length === 0 ?
        <p className="alertNoCards">nessun attaccante tra i preferiti</p> :
        attaccantiList.map((player, index) => (
            <Card
                key={index}
                player={player}
            />
        ))




    return (
        <div className="listContainer">
            <h2>Ecco qua la rosa dei tuoi campioni!</h2>
            <h3>Tra i pali:</h3>
            <section className="rouleSection">
                {portieriCards}
            </section>
            <h3>La muraglia difensiva:</h3>
            <section className="rouleSection">
                {difensoriCards}
            </section>
            <h3>Chi crea le occasioni:</h3>
            <section className="rouleSection">
                {centrocampistiCards}
            </section>
            <h3>I veri bomber:</h3>
            <section className="rouleSection">
                {attaccantiCards}
            </section>
        </div>
    );
}
