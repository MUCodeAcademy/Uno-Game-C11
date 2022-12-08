import { useEffect, useMemo } from "react";

const createKeyChecker = (hotkeys = []) => {
    let index = 0;
    const TAIL = hotkeys.length - 1;

    return (key) => {
        console.log("index", index);
        console.log("key", key);
        if (key !== hotkeys[index]) {
            index = 0;
            return false;
        }

        if (index === TAIL) {
            index = 0;
            return true;
        }

        index++;
        return false;
    };
};

function useHotkey(hotKeys, onMatch) {
    const keyCrawler = useMemo(() => createKeyChecker([].concat(hotKeys)), [hotKeys]);

    const listen = ({ key }) => {
        if (keyCrawler(key)) {
            console.log("match");
            onMatch();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", listen);
        return () => window.removeEventListener("keydown", listen);
    });
}

export default useHotkey;
