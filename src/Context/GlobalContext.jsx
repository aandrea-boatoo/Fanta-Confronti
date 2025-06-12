import { createContext } from "react"
import usePlayer from "./usePlayer";
export const GlobalContext = createContext();
export default function GlobalProvider({ children }) {
    const playerData = usePlayer();

    return (
        <GlobalContext.Provider value={{ ...playerData }}>
            {children}
        </GlobalContext.Provider>
    )
}