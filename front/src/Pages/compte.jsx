import React, { useState } from "react";
import Footer from "../composants/footer";
import {Nav1} from "../composants/header";
import Sidebar from "../composants/sidebar";
import { CardCompte, CardEbillet } from "../composants/card";

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../composants/auth'
import { Link } from "react-router-dom";





function Compte(){

  

    return (<div>
        
        
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