import React, {useContext} from 'react';
import {UserContext} from "../../UserContext";
import uuid from "react-uuid";
import RankingDetails from "./rankingDetails";


const Ranking = () => {


    const {playersRanking} = useContext(UserContext);


    return (<>
            {!playersRanking ? <h1>No data</h1> : <>
                <table className={'game_result'}>
                    <tbody>
                    <tr>
                        <th>Player name</th>
                        <th>Wins</th>
                        <th>Looses</th>
                        <th>Points</th>
                        <th colSpan="5">Details</th>
                    </tr>

                    {playersRanking.map((player) => {
                        return (
                            <RankingDetails
                                key={uuid()}
                                name={player.name}
                                score={player.score}
                                wins={player.wins}
                                looses={player.looses}
                                details={player.cards}
                            />);
                    })}
                    </tbody>
                </table>

                <div className={'rankingDetails'}>
                    <h1 className={'header_primary'}>HOW TO READ COLUMN DETAILS: </h1>
                    <p>AS: ACE, </p>
                    <p>KS: KING, </p>
                    <p>QS: QUEEN, </p>
                    <p>JS: JACK, </p>
                    <br/>
                    <p>2S - 9S: CARD NUMBERS FROM 1 TO 9, </p>
                    <p>0S: CARD NUMBER: 10, </p>
                    <br/>
                    <p>S: SPADES, </p>
                    <p>H: HEARTS, </p>
                    <p>C: CLUBS, </p>
                    <p>D: DIAMONDS, </p>
                </div>
            </>}
        </>
    )

};


export default Ranking;