import React from "react"; 

function Boutton(props){
    return(
        <button className="button1" value={props.value} onClick={props.click}>
        <a className="ref" href={props.lien}>{props.btn}</a> 
        </button>

    )
}


export default Boutton;