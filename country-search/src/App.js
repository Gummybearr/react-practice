import React from 'react'

import SearchBar from './components/SearchBar';
import CountryContainer from './components/CountryContainer';
import DropDownBox from './components/DropDownBox';

function App(){
    return <div>
        <header>My Countries</header>

        <article>
            <SearchBar searchMode='reset'/>
            <CountryContainer searchMode='reset'/>
            <DropDownBox />
        </article>

        <footer>2021</footer>
    </div>
}

export default App;