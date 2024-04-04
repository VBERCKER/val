
import React from "react";
import {Header1, Nav} from "../composants/header";
import {Card2} from "../composants/card";
import OffreGrid from "../composants/offregrid";
import Offre from "../composants/footer"; 
import Footer from "../composants/footer";



function Offrepage(){
    return (<div>
    
    <Nav/>
    <div className="headeroffre">
      <h1 className="titreoffre fw-bold text-body-emphasis"> Découvrez nos offres ! </h1>
    </div>
       
        <OffreGrid />
       <Footer/>
    </div>
      
    )}

export default Offrepage;