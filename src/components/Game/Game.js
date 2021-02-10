import React, {useContext, useRef, useState} from 'react';
import {UserContext} from "../../UserContext";
import User from "../User/User";
import DealerCards from "../Card/DealerCards";
import UserCards from "../Card/userCards"


function Game() {

    const {cards, setCards, bet, setBet, credit, setCredit, dealerCards, setDealerCards, userCards, setUserCards} = useContext(UserContext);
    const buttonRef = useRef();
    console.log(cards.deck)
    const cardsValue = []
    const [dealerIsActive, setDealerIsActive] = useState(false);
    const [round, setRound] = useState(1);

    if(round === 5 ){

        
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
        console.log("in heat")
        setDealerCards(dealerCards => [...dealerCards, ...cards.deck.splice(0, 1)])
        setRound(round + 1)
        disableButton();

    }
    const setStand = () => {

    }
    const disableButton = () => {
        buttonRef.current.disabled = true;
    }

    const dealCards = () => {
        setDealerCards(cards.deck.splice(0, 2));
        setUserCards(cards.deck.splice(0, 2));
        setDealerIsActive(true)
    }

    return (
        <>
            <User/>
            <div id={"game_board"}>
                <div id={'game_details'}>Round: {round} Cards: {cards.deck.length}</div>

                {dealerIsActive ? <>
                    <button ref={buttonRef} className={'choose'} onClick={setHit}>Hit</button>
                    <button ref={buttonRef} className={'choose'} onClick={setStand}>Stand</button>
                    <button ref={buttonRef} id={"btn_bet"} className={'token_btn'} onClick={doubleBet} value={100}>100
                    </button>
                </> : <button className={'choose'} onClick={dealCards}>Deal</button>}
            </div>
            <div className={'game_table'}>
                <div className={'game_cards'}>
                    <div className={'dealer_cards'}>
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