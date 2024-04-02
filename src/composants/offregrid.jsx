import React, {useState} from "react";
import { Card2 } from "./card";


const offres = [{offre:"Solo", descriptions:"Acheter une place", sport:"Rugby"},{offre:"Duo", descriptions:"Acheter 2 places", sport:"Rugby"},{offre:"Familiale", descriptions:"Acheter jusqu'a 4 places", sport:"Rugby"}];



//Grid 3 colonnes pour les offres 
function OffreGrid (){
    const [offre, setbilletes]= useState("Cliquez sur une offre pour accèder à la bieterie !");

    function billets(){
        setbilletes([offres]) 
    }; 
    return (
        <div>
            <div class="container text-center">
  <div class="row row-cols-3">
 { offres.map((items)=>{return(<div class="col"> <Card2 offre={items.offre} description ={items.descriptions}  /></div>)})}
  </div>
  <p className="offre" onClick={billets}>{offre} </p>
</div>
        </div>
    )
}






export default OffreGrid;