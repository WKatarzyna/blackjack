import React from 'react';
import './DealerCard.css'
// import Moment from 'react-moment';



const UserCards = (props) => {

    return (
        <>


            {/*{console.log(cards[Math.floor(Math.random() * cards.length)])}*/}
            <img className={"card_front"} src={props.front} alt={'avatar'}/>

        </>
    )
};


export default UserCards;