import React from "react";

function OfferCard(props){
    return (
        <div>
             <div class="myCard">
        <div class="innerCard">
            <div class="frontSide">
                <p class="title">{props.fronttitre}</p>
                <p>{props.frontcontent}</p>
            </div>
            <div class="backSide">
                <p class="title">{props.backtitre}</p>
                <p>{props.backcontent}</p>
            </div>
        </div>
    </div>
        </div>
    )
}

export default OfferCard;