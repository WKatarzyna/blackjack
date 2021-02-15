import React, {useContext, useRef, useState, useEffect} from 'react';
import {UserContext} from "../../UserContext";
import User from "../User/User";
import DealerCards from "../Card/DealerCards";
import UserCards from "../Card/userCards";
import uuid from 'react-uuid';
import {Link} from 'react-router-dom';
import GameBtn from "../Buttons/Button";
import './Game.css';


function Game() {
    const {
        playerName, cards, bet, setBet, credit, setCredit, dealerCards,
        setDealerCards, userCards, setUserCards, allWins, setAllWins, allLooses, setAllLooses, setPlayersRanking, round, setRound, database
    } = useContext(UserContext);

    const buttonRef = useRef();
    const [dealerIsActive, setDealerIsActive] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);
    const [drawAlert, setDrawAlert] = useState(false);
    const [playerLoose, setPlayerLoose] = useState(false);
    const [cardsOnRound, setPlayerCardsOnRound] = useState([]);
    const [hit, setHit] = useState(false);
    let prevRanking = usePrevious(round, cardsOnRound);

    const calculatePoints = (cards) => {
        let number = [], char = [], points = 0, sorted;
        cards.forEach(card => {
            if (!isNaN(parseInt(card.value))) {
                number.push(card.value);
            } else char.push(card.value);
        });
        sorted = number.sort().concat(char.sort().reverse());
        sorted.forEach((card) => {
            if (card === "JACK" || card === "QUEEN" || card === "KING" || card === "10") {
                points += 10;
            } else if (card === "ACE") {
                if (points > 10) points += 1;
                else points += 11;
            } else points += parseInt(card);
        });

        return points;
    };

    const doubleBet = (e) => {
        document.getElementById('btn_bet').classList.add('btn_big');
        setBet(parseInt(bet) + parseInt(e.target.value));
        setCredit(parseInt(credit) - parseInt(bet));
        disableButton();

    };

    const playerHit = (e) => {
        e.preventDefault();
        let pCards = userCards;
        pCards = ([...pCards, ...cards.deck.splice(0, 1)]);
        setUserCards(pCards);
        setHit(true);
        disableButton();
        check(pCards);
    };

    const check = (cards) => {
        if (calculatePoints(cards) > 21) {
            setPlayerLoose(true);
            setAllLooses(allLooses + 1);
            revealTheCard();
        } else if (calculatePoints(cards) === 21) {
            dealerRound();
        }
    };
    const setStand = () => {
        dealerRound();
    };
    const disableButton = () => {
        buttonRef.current.disabled = true;
    };

    const dealCards = () => {
        setRound(round + 1);
        if (round !== 5) setCredit(credit - bet);

        let localPlayerCards = cards.deck.splice(0, 2);
        let localDealerCards = cards.deck.splice(0, 2);
        setDealerCards(localDealerCards);
        setUserCards(localPlayerCards);
        setDealerIsActive(true);

        if (calculatePoints(localPlayerCards) === 21) {
            if (calculatePoints(localDealerCards) !== 21) {
                setCredit(credit + bet * 1.5);
                setPlayerWon(true);
                setAllWins(allWins + 1);
                setDrawAlert(false);
            } else {
                setDrawAlert(true);
                setPlayerWon(false);
                revealTheCard();
            }
        }
    };
    const newRound = () => {
        setDealerCards([]);
        setUserCards([]);
        setBet(100);
        setDealerIsActive(false);
        setPlayerWon(false);
        setPlayerLoose(false);
        setDrawAlert(false);

    };
    const dealerRound = () => {
        let dp = calculatePoints(dealerCards);
        let pp = calculatePoints(userCards);
        let a = dealerCards;
        while (dp <= 17) {
            a = ([...a, ...cards.deck.splice(0, 1)]);
            dp = calculatePoints(a);
        }
        setDealerCards(a);
        if (dp > 21 || dp < pp) {
            setCredit(credit + bet * 1.5);
            setPlayerWon(true);
            setAllWins(allWins + 1);
            setDrawAlert(false);
            revealTheCard()
        } else if (dp > pp) {
            setPlayerLoose(true);
            setAllLooses(allLooses + 1);
            revealTheCard();
        } else {
            setCredit(credit + bet);
            setDrawAlert(true);
            revealTheCard();
        }
    };
    const newGame = () => {
        let insert_data = {
            name: playerName,
            score: credit,
            wins: allWins,
            looses: allLooses,
            cards: cardsOnRound
        };
        database.players.add(insert_data).then(function () {

        }).catch(function (e) {
            alert("Error: " + (e.stack || e));
        });

        setDealerIsActive(false);
        setAllWins(0);
        setAllLooses(0);
        setRound(0);
        setCredit(1000);
        setUserCards([]);
        setDealerCards([]);
        prevRanking = null;

    };
    const resetGame = () => {
        setDealerIsActive(false);
        setAllWins(0);
        setAllLooses(0);
        setRound(0);
        setCredit(1000);
        setUserCards([]);
        setDealerCards([]);
        prevRanking = null;
        document.getElementById('results').textContent = '';
    };
    const revealTheCard = () => {
        setTimeout(() => {
            let backSide = document.getElementById('back_side');
            backSide.src = dealerCards[1].image;
        }, 300);
        setPlayerCardsOnRound(playerCardsOnRound => [...playerCardsOnRound, {
            round: round,
            competitorCards: dealerCards.map(card => {
                return card.code
            }),
            ownedCards: userCards.map(card => {
                return card.code
            })
        }]);

    };
    useEffect(() => {
        const getRecords = async () => {
            let allPlayers = await database.players.toArray();
            setPlayersRanking(allPlayers);
        };
        getRecords().catch(() => {
            console.error();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function usePrevious(round, cards) {
        const ref = useRef();
        useEffect(() => {
            ref.current = round;
            ref.current = cards
        });
        return ref.current;
    }

    return (
        <>{round > 5 || cards.deck.length === 0 ?
            <><h1 className={'header_primary'}>End Game</h1> <Link to={"/"} onClick={newGame}>New game</Link></> :
            <><User/>
                <GameBtn onClick={resetGame}>Reset</GameBtn>
                <div id={"game_board"}>
                    {dealerIsActive ? <>
                        <div id={'game_details'}>Round: {round} Cards: {cards.deck.length}</div>
                        {playerLoose ?
                            <button id={'alert'} onClick={newRound}>'You lost, click to go to next round'</button> : <>
                                {drawAlert ? <button id={'alert'} onClick={newRound}>'Draw!'</button> : <>
                                    {playerWon ?
                                        <button id={'alert'} onClick={newRound}>'You won, Click to start new
                                            round'</button> : <>
                                            <button className={'choose'} onClick={playerHit}>Hit</button>
                                            <button className={'choose'} onClick={setStand}>Stand</button>
                                            <button ref={buttonRef} id={"btn_bet"} className={'token_btn'}
                                                    onClick={doubleBet}
                                                    value={100}>100
                                            </button>
                                        </>}</>} </>}
                    </> : <button className={'choose'} onClick={dealCards}>Deal</button>}
                </div>

                <div className={'game_table'}>
                    <div className={'game_cards'}>
                        <h2>Dealer cards:</h2>
                        <div className={'dealer_cards'}>
                            {dealerCards.map((card, index) => {
                                return (
                                    <DealerCards
                                        key={uuid()}
                                        figure={card.code}
                                        position={index}
                                        value={card.value}
                                        front={card.images.png}
                                    />);
                            })}
                        </div>
                        <h2>Player cards:</h2>
                        <div className={'player_cards'}>
                            {userCards.map((card) => {
                                return (
                                    <UserCards
                                        key={uuid()}
                                        figure={card.code}
                                        value={card.value}
                                        front={card.images.png}
                                    />)
                            })}
                        </div>
                        <div id={'results'}>{prevRanking ? prevRanking.map((details, index) => {
                            return (
                                <p key={index}>{` Rounds: ${details.round}, dealer cards: ${details.competitorCards}, player cards:${details.ownedCards}`}</p>
                            )
                        }) : prevRanking = null
                        }</div>
                    </div>
                </div>
            </>
        }

        </>
    );
}

export default Game;