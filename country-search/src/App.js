import React from 'react'

import SearchBar from './components/SearchBar';
import CountryContainer from './components/CountryContainer';
import DropDownBox from './components/DropDownBox';

function App(){
    return <div>
        <header>My Countries</header>

        <article>
            {/* search bar */}
            <SearchBar searchMode='reset'/>
            {/* container that countains searched & added countries */}
            <CountryContainer searchMode='reset'/>
            {/* button that toggles box that contains searchbar and country container 
            so it can add countries individually */}
            <DropDownBox />
        </article>

        <footer>2021</footer>
    </div>
}

export default App;