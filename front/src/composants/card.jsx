import React from "react";
import Button from "./bouton";


function Carte (props){
  return(
    <div className="service">
      <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="police-titre pb-2 border-bottom">Nos services</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
        </div>
        <div>
          <h3 className=" police-titre fs-2">{props.hsport}</h3>
          <p className="police-p">{props.psport}</p>
          <a className="service-a"  href="#">
            <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#cpu-fill"></use></svg>
        </div>
        <div className="te">
          <h3 className=" police-titre fs-2 text-body-emphasis">{props.hoffre}</h3>
          <p className="police-p">{props.poffre}</p>
          
          <a  href="#" >
           <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#tools"></use></svg>
        </div>
        <div>
          <h3 className=" police-titre fs-2 text-body-emphasis">{props.hjeu}</h3>
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
      <div className="card1">
      <img className="card1 svg" src={props.image}/>
      <div className="card1__content">
        <p className="card1-titre card1__title">{props.titlecard1} </p>
        <p className="card1-text card1__description">{props.pcard1}</p>
      </div>
    </div>
  
)
}

function Card2(props){
  return(
    <div>
      <div className="card2">
  <p className="heading2">
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
   <div className="card4">
  <div >
  <p className="header4">
    {props.offre}
  </p>
  <p className="description" >
    {props.description}
  </p>
 
  </div>
     <div className="actions4">
     <Button click={props.click} value={props.value} btn={"cliquez ici !"}/>
    </div>
  </div>
  </div> )
}
function CardEbillet(props){
  return(
    <div className="cardebillet shadowebillet">
    <div >
        <p className="card1__title">{props.titre}</p>
        
        <Button btn={"Qr-code"}/>
      </div>
</div>
  )
}
function CardCompte(props){
  return(
   
 <div className="cardcompte">
    <a href={props.lien} className="w3-bar-item w3-button">
   
    <div className="bgcompte">
    <h3 className="cardCompte">{props.titre}</h3>
    </div>
    <div className="blobcompte"></div>
   </a> 
    
  </div>
   
   


  )
}

export  {Carte, Card1,Card2,CardEbillet,CardCompte,CardOffre}; 