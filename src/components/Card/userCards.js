import React from 'react';
import './Card.css'



const UserCards = (props) => {

    return (
        <div id={'player_hand'}>
            <img  className={"card_front"} src={props.front} alt={'avatar'}/>
        </div>
    )
};


export default UserCards;