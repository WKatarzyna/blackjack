import React from 'react';
import './Card.css'


const DealerCards = (props) => {

    return (
        <div id ={'dealer_hand'}>
            <img className={"card_front"} src={props.front} alt={'avatar'}/>
        </div>
    )
};


export default DealerCards;