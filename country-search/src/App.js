import React from 'react'

import SearchBar from './component/SearchBar';
import Country from './component/Country';
import Container from './component/Container';
import Button from './component/Button';
import ModalBox from './component/ModalBox';

function App(){
    return <div>
        <header>My Countries</header>

        <article>
            <SearchBar/>
            <Container
                content={<Country
                    name="Korea (Republic of)"
                    alpha2Code="KR"
                    callingCodes="82"
                    capital="Seoul"
                    region="Asia"
                />}
            />
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