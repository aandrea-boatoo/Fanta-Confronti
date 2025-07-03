import { useState } from "react"

export default function useStorage(itemKey, initialValue) {
    const [state, setState] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue;
        }
    })

    const customState = (newState) => {
        setState(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }
    return [state, customState];
}