import React, {useContext, useState} from "react";
import logo from '../assets/images/icon.svg';
import {UserContext} from "../UserContext";
import './Main.css';
import GameBtn from "../components/Buttons/Button";
import Input from "../components/Inputs/Input";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import User from "../components/User/User";


export function Main() {

    const {playerName, setPlayerName, cardDeck, setCards, playersRanking, setCredit, setRound} = useContext(UserContext);
    const [start, setStart] = useState(false);
    const url = `https://deckofcardsapi.com/api/deck/${cardDeck.deck.deck_id}/draw/?count=89`;
    if (start) {
        return <Redirect to="/game"/>
    }
    playersRanking.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
    const ranking = playersRanking.slice(0, 5);
    const getCards = () => {

        axios.get(url, {
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => {
                setCards({deck: res.data.cards})
            })
            .catch(() => console.error)
    };
    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPlayerName(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getCards();
        setStart(true);
    };
    const resetGame = () => {
        setCredit(1000);
        setPlayerName(null);
        setRound(0);
        document.getElementById('input_form').value = '';
    };

    return (

        <div className={'container_context'}>
            <h1 className={'header_primary'}>BlackJack Game</h1>
            <img src={logo} className="App-logo" alt="logo"/>
            <table className={'game_results'}>
                <tbody>
                <tr>
                    <th>Player Name</th>
                    <th>Player Score</th>
                    <th>Player Wins</th>
                    <th>Player Looses</th>
                </tr>
                {ranking ? ranking.map((player, index) => {
                    return (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                            <td>{player.wins}</td>
                            <td>{player.looses}</td>
                        </tr>
                    )
                }) : <td>{}</td>}

                </tbody>

            </table>
            {playerName ? <><User/>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Edit Name:
                            <Input id={"input_form"} type="text" onChange={handleChange}/>
                        </label>
                        <GameBtn type="submit" value="Start">Continue</GameBtn>
                    </form>
                    <GameBtn onClick={resetGame}>Reset</GameBtn>
                </> :
                <><h1 className={'header_primary'}>New player</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <Input type="text" onChange={handleChange}/>
                        </label>
                        <GameBtn type="submit" value="Start">Start</GameBtn>
                    </form>
                </>}
        </div>)
}


export default Main;

