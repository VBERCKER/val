
import React from "react";
import {Header, Nav} from "../composants/header";
import {Card2} from "../composants/card";
import OffreGrid from "../composants/offregrid";
import Offre from "../composants/footer"; 
import {FormRE} from "../composants/FormCO";
import Footer from "../composants/footer";


function Enregistrement(){
    return (<div className="page">
    
    <div className="formRE">
    <FormRE/> 
    </div>
         
    
    <Footer/>  
    </div>
      
    )}




export default Enregistrement;