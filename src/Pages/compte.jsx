import React from "react";
import Footer from "../composants/footer";
import {Nav1} from "../composants/header";
import Sidebar from "../composants/sidebar";
import { CardCompte, CardEbillet } from "../composants/card";

function Compte(){
    return (<div>
        <Nav1 />
        <Sidebar titrem={"Mon compte"} contentem={  <div className="container text-center">
  <div className="row g-5 ">
    <div className="col "><CardCompte lien={"/utilisateur"} titre={"Mes informations utilisateurs"}/> </div>
    <div className="col"><CardCompte lien={"/ebillet"}  titre={"Mes E-billets"}/> </div>
    <div className="col"><CardCompte lien={"/panier"} titre={"Mon panier"}/> </div>
    <div className="col"><CardCompte lien={"/offre"} titre={"Billetrerie"}/> </div>
    
     
    </div>
    <Footer/>
    </div>}/>
      
        </div>
      
    )}




export default Compte;