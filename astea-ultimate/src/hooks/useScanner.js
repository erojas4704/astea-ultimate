import { useEffect, useState } from "react";
import useKey from "./useKey";

export default function useScanner() {
    const [scanBuffer, setScanBuffer] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const [input, setInput] = useState(null);
    const key = useKey();

    useEffect(() => {
        if (document.activeElement.nodeName === "INPUT") return;
        if (key === null) return;

        if (key.key === "Enter") {
            console.log("FINITO", scanBuffer);
            setInput(scanBuffer);
            setScanBuffer("");
            clearTimeout(timeoutId);
            setTimeoutId(null);
            return;
        } else if ((key.keyCode >= 48 && key.keyCode <= 90) || key.keyCode >= 96 && key.keyCode <= 105) { //TODO seperate into function checking if valid key (alphanumeric)
            setScanBuffer(current => current + key.key);
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }

        setTimeoutId(
            setTimeout(() => {
                console.log("Cleared buffer ", scanBuffer);
                setScanBuffer("");
                setInput("");
                setTimeoutId(null);
            }, 200));
    }, [key]);

    return input;
}