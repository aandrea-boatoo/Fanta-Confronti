import { useState } from "react"

export default function useStorage(itemKey, initialValue) {
    const [state, setState] = useState(() => {
        const prevState = sessionStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            sessionStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue;
        }
    })

    const customState = (newState) => {
        setState(newState);
        sessionStorage.setItem(itemKey, JSON.stringify(newState));
    }
    return [state, customState];
}