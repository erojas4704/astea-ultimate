import { useEffect, useState } from "react";

export default function useKey(callback) {
    const [key, setKey] = useState(null);
    useEffect(() => {
        const onKeyDown = e => {
            if(callback) callback(e);
            setKey(e);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
    return key;
}