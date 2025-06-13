import { Link } from "react-router-dom";


export default function HeroPage() {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Confronta i tuoi calciatori</h1>
                <p className="hero-subtitle">
                    Dubbi di formazione? Statistiche a confronto per prendere la decisione giusta.
                </p>
                <Link to="/playerList" className="hero-button">
                    Inizia lo studio
                </Link>
            </div>
            <div className="hero-background-overlay"></div>
        </div>
    );
}
