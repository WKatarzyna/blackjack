import React from 'react';
import './Card.css'
import cardBack from '../../assets/images/card_back.jpg'


const DealerCards = (props) => {
    return (
        <div id={'dealer_hand'}>
            {props.position === 1 ? <img id="back_side" className={"card_back"} src={cardBack} alt={'avatar'}/> :
                <img className={"card_front"} src={props.front} alt={'avatar'}/>}

        </div>

    )
};


export default DealerCards;