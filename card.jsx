import React from "react";
import Button from "./bouton";


 function Carte (props){
    return(<div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100 ">
        <img src={props.sport} class="card-img-top" alt={props.sportalt} height="350"/>
        <div class="card-body ">
          <h5 class="card-title">{props.hsport}</h5>
          <p class="card-text">{props.psport}</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src={props.offre} class="card-img-top" height="350" alt={props.offrealt}/>
        <div class="card-body ">
          <h5 class="card-title">{props.hoffre}</h5>
          <p class="card-text">{props.poffre}</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src={props.jeu} class="card-img-top" alt={props.jeualt} height="350"/>
        <div class="card-body ">
          <h5 class="card-title">{props.hjeu}</h5>
          <p class="card-text">{props.pjeu}</p>
        </div>
      </div>
    </div>
   
  </div>
    )
}

function Card1(props){
  return(
      <div class="card1">
      <img className="card1 svg" src={props.image}/>
      <div class="card1__content">
        <p class="card1__title">{props.titlecard1} </p>
        <p class="card1__description">{props.pcard1}</p>
      </div>
    </div>
  
)
}

function Card2(props){
  return(
    <div>
      <div class="card2">
  <p class="heading2">
    {props.offre}
  </p>
  <p >
    {props.description}
  </p>
  <Button click={props.click} value={props.value} btn={"cliquez ici !"}/>
  </div>
    </div>
  )
}

export  {Carte, Card1,Card2}; 