import React, { useState } from "react";
import Footer from "../composants/footer";
import {Nav1} from "../composants/header";
import Sidebar from "../composants/sidebar";
import { CardCompte, CardEbillet } from "../composants/card";
import axios from 'axios';

function Compte(){
 
    const [connexion,setconnexion]= useState("Non conecté");


async function test (){

    try{
        const result= await axios.get("http://localhost:3000/validation")
         console.log(result.data)
         if(result.data =='Autorisation'){
            return setconnexion(<div>tout ok </div>)
 
         }else {setconnexion(result.data)}
     }catch(error){console.log(error)}
     }


test();


    return (<div>
        <Nav1 />
        
        <Sidebar titrem={"Mon compte"} contentem={  <div className="container text-center">
  <div className="row g-5 ">
    <div className="col ">    <div>{connexion}</div><CardCompte lien={"/utilisateur"} titre={"Mes informations utilisateurs"}/> </div>
    <div className="col"><CardCompte lien={"/ebillet"}  titre={"Mes E-billets"}/> </div>
    <div className="col"><CardCompte lien={"/panier"} titre={"Mon panier"}/> </div>
    <div className="col"><CardCompte lien={"/offre"} titre={"Billetrerie"}/> </div>
    
     
    </div>
    <Footer/>
    </div>}/>
      
        </div>
      
    )}




export default Compte;