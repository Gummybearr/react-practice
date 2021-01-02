import React from 'react'

import SearchBar from './components/SearchBar';
import Country from './components/Country';
import CountryContainer from './components/CountryContainer';
import Button from './components/Button';
import ModalBox from './components/ModalBox';

function App(){
    return <div>
        <header>My Countries</header>

        <article>
            <SearchBar/>
            <CountryContainer/>
            <Button text="Add Countries"/>
        </article>

        <ModalBox content={
            <>
                <SearchBar/>
                <Button text="Add to List"/>
            </>
        }/>

        <footer>2021</footer>
    </div>
}

export default App;