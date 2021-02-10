import React, {useState, useMemo, useEffect} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import axios from 'axios';
// import { createBrowserHistory } from "history"
import Main from "./pages/Main";
import Game from "./components/Game/Game"
import {UserContext} from "./UserContext";
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer";
import './App.css'


function App() {

    const [user, setUser] = useState(null);
    const [cardDeck, setCardDeck] = useState({deck: []});
    const [cards, setCards] = useState({deck: []});
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
    const [score, setScore] = useState(0);
    const [bet, setBet] = useState(100);
    const [credit, setCredit] = useState(1000);
    const [userList, setList] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);

    const value = useMemo(
        () => ({
            user, setUser,
            userList, setList,
            score, setScore,
            bet, setBet,
            credit, setCredit,
            cardDeck, setCardDeck,
            cards, setCards,
            userCards, setUserCards,
            dealerCards, setDealerCards,

        }), [user, setUser, userList, setList, score, setScore, bet, setBet, credit, setCredit, cardDeck, setCardDeck, cards, setCards,userCards,setUserCards,dealerCards,setDealerCards]
    );

    useEffect(() => {
        getDeck();
    }, []);

    const getDeck = () => {
        axios.get(url, {
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => {
                setCardDeck({deck: res.data})
            })
    }

    return (
        <>
            <div className={'container'}>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <UserContext.Provider value={value}>
                                <Main/>
                            </UserContext.Provider>
                        </Route>
                        <Route path='/game'>
                            <UserContext.Provider value={value}>
                                <Game/>
                            </UserContext.Provider>
                        </Route>
                    </Switch>
                </Router>
            </div>
            <Footer/>
        </>

    );
}

export default App;