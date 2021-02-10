import React, {useContext, useState} from "react";
import logo from '../assets/images/black-jack.svg';
import male_avatar from '../assets/images/male_avatar.svg'
import female_avatar from '../assets/images/female_avatar.svg';
import {UserContext} from "../UserContext";
import './Main.css';
import GameBtn from "../components/Buttons/Button";
import Input from "../components/Inputs/Input";
import {Redirect} from 'react-router-dom';
import axios from "axios";


export function Main() {
    const {user, setUser, cardDeck, cards, setCards, userCards, setUserCards, dealerCards, setDealerCards} = useContext(UserContext);
    const [start, setStart] = useState(false);

    const url = `https://deckofcardsapi.com/api/deck/${cardDeck.deck.deck_id}/draw/?count=89`;
    if (start) {
        return <Redirect to="/game"/>
    }

    const getCards = () => {

        axios.get(url, {
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => {
                setCards({deck: res.data.cards})
            })
            .catch(() => console.error)
    }
    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setUser(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getCards();
        setStart(true);

    }
    return (

        <div className={'container_context'}>
            <h1 className={'header_primary'}>BlackJack Game</h1>
            <img src={logo} className="App-logo" alt="logo"/>
            <div>
                <img src={male_avatar} className="App-avatar" alt="avatar"/>
                <img src={female_avatar} className="App-avatar" alt="avatar"/>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <Input type="text" onChange={handleChange}/>
                </label>
                <GameBtn type="submit" value="Start">Start</GameBtn>
            </form>

            {/*<Input id={"form_input"} onChange={handleChange}/>*/}
            {/*{start ? <Button onClick={getCards}>Start</Button>: "Write name" }*/}
        </div>)

}


export default Main;

