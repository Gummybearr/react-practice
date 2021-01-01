import React from 'react';
import './SearchBar.css';

const SearchBar = () => {

    const clickSearch = () => {console.log('ok')}

    return <div>
        searchBar
        <div id="ok"onClick={clickSearch}>
            go search
        </div>
    </div>
}

export default SearchBar;