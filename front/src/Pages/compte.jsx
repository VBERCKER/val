import React, { useEffect, useState } from "react";
import Footer from "../composants/footer";
import {Nav1} from "../composants/header";
import Sidebar from "../composants/sidebar";
import { CardCompte, CardEbillet } from "../composants/card";

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../composants/auth'
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../composants/cookies";





  function Compte (){

   const cookie= getCookie('user')
   const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
   
   const [user,setuser]=useState("")

   useEffect(()=>{ 
    
    fetch(`http://localhost:3000/users/${cookie}`,requestOptions)
  
      .then(res=> console.log(res.json()))
      .catch(err=>console.log(err));
  },[])
  

    return (<div>
        
        <h1>{user}</h1>
        <Sidebar titrem={"Mon compte"} //contentem={  <div className="container text-center">
 // <div className="row g-5 ">
   // <div className="col "><CardCompte lien={<Link to="utilisateur"/>} titre={"Mes informations utilisateurs"}/> </div>
   // <div className="col"><CardCompte lien={"/ebillet"}  titre={"Mes E-billets"}/> </div>
   // <div className="col"><CardCompte lien={"/panier"} titre={"Mon panier"}/> </div>
   // <div className="col"><CardCompte lien={"/offre"} titre={"Billetrerie"}/> </div>

   // </div>
   // <Footer/>
    //</div>}
    />
      
        </div>
      
    )}




export default Compte;