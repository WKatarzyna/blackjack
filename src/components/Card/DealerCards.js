import React from 'react';
import './DealerCard.css'


const DealerCards = (props) => {
    console.log(props)
    console.log(props)
    return (
        <>
            <img className={"card_front"} src={props.front} alt={'avatar'}/>
        </>
    )
};


export default DealerCards;