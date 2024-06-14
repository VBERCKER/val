
import React, { useEffect, useState } from "react";
import {LogIN} from "../composants/FormCO";
import Footer from "../composants/footer";
import {Nav} from "../composants/header";


function Connexion(){
   
    return (<div>
  
  
        <div className="login">
            <LogIN/>
        </div>
         
     <Footer/>
         
        </div>
      
    )}




export default Connexion;