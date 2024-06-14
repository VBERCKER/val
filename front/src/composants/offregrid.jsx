import React, {useState,useEffect} from "react";
import {Cardoffre1} from "./card";
import { setCookie } from "./cookies";
import { saveTickets,addTickets,getTickets } from "./gestionpanier";




//Grid 3 colonnes pour les offres pages offres 
function OffreGrid (){

    const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
     const [sport,setSport]=useState([])
     const [offre,setOffre]=useState([])

     const bdSport= ()=>{
        fetch(`http://localhost:3000/sport`,requestOptions)
        .then((response)=>{
          return response=response.json()
        } )
        .then((result)=>{setSport(result)
          } )
        .catch(err=>console.log(err)); } 

        const bdoffre= ()=>{
            fetch(`http://localhost:3000/offre`,requestOptions)
            .then((response)=>{
              return response=response.json()
            } )
            .then((result)=>{setOffre(result)
              } )
            .catch(err=>console.log(err)); } 


    useEffect(()=>{ 
       bdSport()
       bdoffre()
        
      },[])
     
      
      
    return (
        <div>
            <h2 className="police-titre text-center">Billeteries</h2>
            
            <div className="sport">
                    {sport.map((items)=>{return(<div className="sport-tit"  key={items.id}><h3 className="police-titre display-6 text-body-emphasis lh-1 mb-3 text-pop-up-top  sport-titre">{items.Sport}</h3>
            
                         <div className="container text-center">
                            <div className=" row g-4 row-cols-3 row-cols-sm-1 row-cols-md-3">
                             { offre.filter((offres)=>offres.SPORT_ID == items.id).map((offres)=>{return(<div className="col " key={offres.id}> <Cardoffre1 id={offres.id} sport={offres.Sport} offre={offres.Offre} description={offres.Place_offre} prix={offres.Prix_offre} image={offres.sport_img}/></div>)})}
                            </div>
                         </div>

                    </div>)})}



            </div>
          
          
        
           
           
        </div>
    )
}






export default OffreGrid;