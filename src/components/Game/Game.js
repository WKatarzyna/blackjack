import React, {useContext, useRef, useState,useEffect} from 'react';
import {UserContext} from "../../UserContext";
import User from "../User/User";
import DealerCards from "../Card/DealerCards";
import UserCards from "../Card/userCards"


function Game() {

    const {cards, setCards, bet, setBet, credit, setCredit, dealerCards, setDealerCards, userCards, setUserCards} = useContext(UserContext);
    const buttonRef = useRef();

    const cardsValue = []
    const [dealerIsActive, setDealerIsActive] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [drawAlert, setdrawAlert] = useState(false);
    const [lose, setLose] = useState(false);
    const [round, setRound] = useState(1);
    const [dealerPoints, setDealerPoints] = useState(0);
    const [playerPoints, setPlayerPoints] = useState(0);



    const calculatePoints = (cards) => {

        let number = [], char = [], points = 0, sorted;
        cards.forEach(card => {

            if (!isNaN(parseInt(card))) {
                number.push(card);
            } else char.push(card);
        });

        sorted = number.sort().concat(char.sort().reverse());

        sorted.forEach((card) => {
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING" || card.value === "10") {
                points += 10
            }
            else if (card.value === "ACE") {
                if (points > 10) points += 1
                else points += 11
            } else points += parseInt(card.value);
        })

        return points;
    }

    const doubleBet = (e) => {
        document.getElementById('btn_bet').classList.add('btn_big')
        setBet(parseInt(bet) + parseInt(e.target.value))
        setCredit(parseInt(credit) - parseInt(bet))
        disableButton();
        setRound(round + 1)

    }
    const setHit = (e) => {
        e.preventDefault()
         setUserCards(userCards => [...userCards, ...cards.deck.splice(0, 1)]);
        disableButton();
        check()
    }

    const check =()=>{
        setUserCards(userCards => [...userCards, ...cards.deck.splice(0, 1)]);

        if(calculatePoints(userCards) >21){
            setLose(true)
        }
        setRound(round + 1)
    }
    const setStand = () => {

    }
    const disableButton = () => {
        buttonRef.current.disabled = true;
    }

    const dealCards = () => {
        setCredit(credit - bet)
        setDealerCards(cards.deck.splice(0, 2));
        setUserCards(cards.deck.splice(0, 2));
        setDealerIsActive(true)

        if (calculatePoints(userCards) === 21) {

            if (calculatePoints(dealerCards) !== 21) {

                setCredit(credit + bet * 1.5);
                setPopUp(true)
                setdrawAlert(false)
            } else {

                setdrawAlert(true)
                setPopUp(false)
            }

            // setDealerIsActive(false)
        }

    }
    const newRound = () => {
        setDealerCards([]);
        setUserCards([]);
        setDealerIsActive(false)
        setPopUp(false)
    }

    return (
        <>
            <User/>

            <div id={"game_board"}>
                <div id={'game_details'}>Round: {round} Cards: {cards.deck.length}</div>
                {dealerIsActive ? <>
                    { lose? <button onClick={newRound}>'You lost, click to go to next round'</button> :<>
                    {drawAlert ? <button onClick={newRound}>'You and dealer have a BlackJack'</button> : <>
                        {popUp ? <button id={'alert'}
                                         onClick={newRound}>'You won, Click to start new round'</button> : <>
                            <button ref={buttonRef} className={'choose'} onClick={setHit}>Hit</button>
                            <button ref={buttonRef} className={'choose'} onClick={setStand}>Stand</button>
                            <button ref={buttonRef} id={"btn_bet"} className={'token_btn'} onClick={doubleBet}
                                    value={100}>100
                            </button>
                        </>}</>} </>}
                </> : <button className={'choose'} onClick={dealCards}>Deal</button>}
            </div>

            <div className={'game_table'}>
                <div className={'game_cards'}>
                    <div className={'dealer_cards'}>
                        <h1>Dealer cards:</h1>
                        {dealerCards.map((card) => {
                            return (
                                <DealerCards
                                    key={card.code}
                                    figure={card.code}
                                    value={card.value}
                                    front={card.images.svg}
                                />)
                        })}
                    </div>

                    <div className={'player_cards'}>
                        Player cards:
                        {userCards.map((card) => {
                            return (
                                <UserCards
                                    key={card.code}
                                    figure={card.code}
                                    value={card.value}
                                    front={card.images.svg}
                                />)
                        })}
                    </div>
                </div>


            </div>
        </>
    );
}

export default Game;