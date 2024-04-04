import React, {useState} from "react";
import { Card2 } from "./card";


const offres = [{id: 1, offre:"Solo", descriptions:"Achetez 1 place", sport:"Rugby"},{id: 2,offre:"Duo", descriptions:"Acheter 2 places", sport:"Rugby"},{id: 3,offre:"Familiale", descriptions:"Achetez de 1 à 4 places", sport:"Rugby"}];



//Grid 3 colonnes pour les offres 
function OffreGrid (){
    const [offre, setbilletes]= useState("Cliquez sur une offre pour accèder à la bieterie !");

    function billets(event){
        const test=event.target.value;
        setbilletes(test) ;
     
    }; 
    return (
        <div>
            <div class="container text-center">
  <div class="row row-cols-3">
  
 { offres.map((items)=>{return(<div class="col"> <Card2 click={billets} value={items.offre} offre={items.offre} description ={items.descriptions}  /></div>)})}
  </div>
  <p className="offre" >{offre} </p>
  
</div>
        </div>
    )
}






export default OffreGrid;