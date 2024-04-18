import React, { useState } from "react";
import Footer from "../composants/footer";
import {Nav1} from "../composants/header";
import Sidebar from "../composants/sidebar";
import { CardCompte, CardEbillet } from "../composants/card";
import axios from 'axios';


function Compte(){
 
    const [connexion,setconnexion]= useState("Non conecté");


async function test (){
    try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(login) };
        
    const result= await fetch('http://localhost:3000/autorisation', requestOptions); 
    const response = await result.json();
    
    console.log(response); 
    if(response =='Autorisation')
    { 
     setlogin("ok"); 
}else {setErreur(response)} 
}catch(error){console.log(error)} }


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