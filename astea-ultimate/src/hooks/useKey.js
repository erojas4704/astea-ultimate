import { useEffect, useState } from "react";

//TODO make this stateless so it doesn't force unnecessary re-renders
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