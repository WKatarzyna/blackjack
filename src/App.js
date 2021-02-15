import React, {useState, useMemo, useEffect} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import Main from "./pages/Main";
import Game from "./components/Game/Game"
import {UserContext} from "./UserContext";
import Footer from "./components/Footer";
import Ranking from "./components/Ranking/userRanking";
import './App.css'
import Dexie from 'dexie';


function App() {

    const [playerName, setPlayerName] = useState(null);
    const [cardDeck, setCardDeck] = useState({deck: []});
    const [cards, setCards] = useState({deck: []});
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
    const [allWins, setAllWins] = useState(0);
    const [allLooses, setAllLooses] = useState(0);
    const [bet, setBet] = useState(100);
    const [credit, setCredit] = useState(1000);
    const [userList, setList] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playersRanking, setPlayersRanking] = useState([]);
    const [round, setRound] = useState(0);
    const [database, setDatabase] = useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const db = new Dexie("playersRank");
    db.version(1).stores({
        players: "++id, name, score,wins, looses, cards"

    });
    db.open().catch((err) => {
        console.error(err.stack || err)
    });

    const value = useMemo(
        () => ({
            playerName, setPlayerName,
            userList, setList,
            allWins, setAllWins,
            allLooses, setAllLooses,
            bet, setBet,
            credit, setCredit,
            cardDeck, setCardDeck,
            cards, setCards,
            userCards, setUserCards,
            dealerCards, setDealerCards,
            playersRanking, setPlayersRanking,
            round, setRound,
            database, setDatabase


        }),
        [playerName, setPlayerName, userList, setList, allWins, setAllWins, allLooses, setAllLooses,
            bet, setBet, credit, setCredit, cardDeck, setCardDeck, cards, setCards, userCards, setUserCards,
            playersRanking, setPlayersRanking, dealerCards, setDealerCards, round, setRound, database, setDatabase
        ]
    );


    useEffect(() => {
        getDeck();
        setDatabase(db)
    }, []);

    const getDeck = () => {
        axios.get(url, {
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => {
                setCardDeck({deck: res.data})
            })
    };

    return (
        <Router>
            <div className={'container'}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/game">Game</Link>
                        </li>
                        <li>
                            <Link to="/ranking">Ranking</Link>
                        </li>
                    </ul>
                </nav>
                <UserContext.Provider value={value}>
                    <Route path='/' exact component={Main}/>
                    <Route path='/game' exact component={Game}/>
                    <Route path='/ranking' exact component={Ranking}/>
                </UserContext.Provider>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;