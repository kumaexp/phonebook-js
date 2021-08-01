import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash/debounce';

function Searchbox({ onSearch = () => {} }) {
    const [searchText, updateText] = useState("");

    const sendEvent = useCallback(debounce(text => {
        onSearch(text);
    }, 1000), []);

    useEffect(() => {
        sendEvent(searchText);
    }, [searchText]);

    return (
        <div className="text-lg text-gray-800 w-auto border-2 rounded-lg border-gray-300 p-2 m-1">
            <input
                className="w-full outline-none"
                type="text"
                placeholder="Search here..."
                value={searchText}
                onChange={e => updateText(e.target.value)}            
            />
        </div>
    );
}

export default Searchbox;