import React from 'react';
import './rankingDetails.css';
import uuid from 'react-uuid';


function RankingDetails(props) {

    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td>{props.wins}</td>
                <td>{props.looses}</td>
                <td>{props.score}</td>
                {props.details.map((details,index) => {
                    return (
                        <>
                            <td key={uuid()}>{` Rounds: ${details.round}, dealer cards: ${details.competitorCards}, player cards:${details.ownedCards}`}</td>
                        </>

                    )
                })
                }
            </tr>

        </>

    );
}

export default RankingDetails;