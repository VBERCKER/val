
import React from "react";
import {Header, Nav} from "../composants/header";
import {Card2} from "../composants/card";
import OffreGrid from "../composants/offregrid";
import Offre from "../composants/footer"; 


function Offrepage(){
    return (<div>
    
    <Nav/>
        <Header src = {"./public/img/Paris2024-Contenus-Affiche_Officiel-RVB-2560x1440-1.webp"}
         alt={"dessin de paris et ses monuments"} 
         h1={"Offre Solo"}
           p= {"test"} 
           btn1= {"Prenez vos billets"}
         
         />
        <OffreGrid />
        <Offre/>
    </div>
      
    )}

export default Offrepage;