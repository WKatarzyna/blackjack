import React, {useContext} from 'react';
import {UserContext} from "../../UserContext";
import './User.css';
import Wrapper from "../Wrapper";


function User() {
    const {playerName, credit, bet, allWins, allLooses, round} = useContext(UserContext);
    return (

        <div className={'user_details'}>
            <div className={'header_primary'}>Bank:{credit} $</div>
            <Wrapper> Player: {playerName}</Wrapper>
            <Wrapper> Bet: {bet}</Wrapper>
            <Wrapper> allWins: {allWins}</Wrapper>
            <Wrapper> allLooses {allLooses}</Wrapper>
            <Wrapper> Current Round: {round}</Wrapper>
        </div>
    )
}

export default User;