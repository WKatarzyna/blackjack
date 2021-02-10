import React, {useContext, useRef, useState} from 'react';
import {UserContext} from "../../UserContext";
import User from "../User/User";
import DealerCards from "../Card/DealerCards";
import UserCards from "../Card/userCards"


function Game() {

    const {cards, setCards, bet, setBet, credit, setCredit, dealerCards, setDealerCards, userCards, setUserCards} = useContext(UserContext);

    const buttonRef = useRef();
    const [dealerIsActive, setDealerIsActive] = useState(false);
    const [round, setRound] = useState(1);

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
            Round: {round}
            Cards: {cards.deck.length}
            <div id={"game_board"}>


                {dealerIsActive ? <>

                    <button onClick={setHit}>Hit</button>
                    <button onClick={setStand}>Stand</button>
                    <button ref={buttonRef} id={"btn_bet"} className={'token_btn'} onClick={doubleBet} value={100}>100
                    </button>
                </> : <button onClick={dealCards}>Deal</button>}
            </div>
            <div className={'card'}>

                {dealerCards.map((card) => {
                    return (

                        <DealerCards
                            key={card.code}
                            value={card.value}
                            front={card.images.svg}
                        />

                    )
                })}
                {userCards.map((card) => {
                    return (
                        <UserCards
                            key={card.code}
                            value={card.value}
                            front={card.images.svg}
                        />
                    )
                })}

            </div>


        </>
    );
}

export default Game;