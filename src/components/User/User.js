import React, {useContext} from 'react';
import {UserContext} from "../../UserContext";
import './User.css';


import {Redirect} from "react-router-dom";


function User() {
    const {user, credit, setCredit, bet, setBet, score, setScore,} = useContext(UserContext);

    const handleClick = (e) => {
        if (parseInt(credit) <= 0 || parseInt(bet) > 1000) {
            setCredit(0);
            setBet(1000)
        } else {
            setBet(parseInt(bet) + parseInt(e.target.value))
            setCredit(parseInt(credit) - parseInt(e.target.value))
        }

    }

    return (

        <div>
            <div className={'user_details'}>
                {user ? <>
                        <div className={'header_primary'}>Bank:{credit} $</div>
                        <p>Place your bet</p>
                        <div> Name: {user}</div>
                        <div> Bet: {bet}</div>
                        <div> Score: {score}</div>
                    </> :
                    <h1 className={'header_primary'}>No user provided, please return to home and login</h1>
                }

            </div>

        </div>

    )
}

export default User;