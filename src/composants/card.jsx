import React from "react";
import Button from "./bouton";


function Carte (props){
  return(
    <div className="service">
      <div class="container px-4 py-5" id="hanging-icons">
    <h2 class="police-titre pb-2 border-bottom">Nos services</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg class="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
        </div>
        <div>
          <h3 class=" police-titre fs-2">{props.hsport}</h3>
          <p className="police-p">{props.psport}</p>
          <a className="service-a"  href="#">
            <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg class="bi" width="1em" height="1em"><use xlink:href="#cpu-fill"></use></svg>
        </div>
        <div className="te">
          <h3 class=" police-titre fs-2 text-body-emphasis">{props.hoffre}</h3>
          <p className="police-p">{props.poffre}</p>
          
          <a  href="#" >
           <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg class="bi" width="1em" height="1em"><use xlink:href="#tools"></use></svg>
        </div>
        <div>
          <h3 class=" police-titre fs-2 text-body-emphasis">{props.hjeu}</h3>
          <p className="police-p">{props.pjeu}</p>
          <a className="police-p" href="#" >
            <Button btn={"bouton"}/>
          </a>
        </div>
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
        <p class="card1-titre card1__title">{props.titlecard1} </p>
        <p class="card1-text card1__description">{props.pcard1}</p>
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
function CardOffre(props){
  return(<div>
   <div class="card4">
  <div >
  <p class="header4">
    {props.offre}
  </p>
  <p className="description" >
    {props.description}
  </p>
 
  </div>
     <div class="actions4">
     <Button click={props.click} value={props.value} btn={"cliquez ici !"}/>
    </div>
  </div>
  </div> )
}
function CardEbillet(props){
  return(
    <div class="cardebillet shadowebillet">
    <div >
        <p class="card1__title">{props.titre}</p>
        
        <Button btn={"Qr-code"}/>
      </div>
</div>
  )
}
function CardCompte(props){
  return(
   
 <div class="cardcompte">
    <a href={props.lien} class="w3-bar-item w3-button">
   
    <div class="bgcompte">
    <h3 className="cardCompte">{props.titre}</h3>
    </div>
    <div class="blobcompte"></div>
   </a> 
    
  </div>
   
   


  )
}

export  {Carte, Card1,Card2,CardEbillet,CardCompte,CardOffre}; 