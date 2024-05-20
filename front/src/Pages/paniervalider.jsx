import React,{useState,useEffect} from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import Sidebar from "../composants/sidebar";
import { getTotalPrice,getTickets } from "../composants/gestionpanier";
import Boutton from "../composants/bouton";
import { useNavigate} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";

export default function PanierValider(){

    const [ticket,setTicket]=useState([])
    const [prix,setPrix]=useState([])
    const [panierHeader,setPanierHeader]=useState("Verifiez votre panier, puis passez au payement.")
    
   
    function headPanier(){
      if(ticket.length){
        setPanierHeader("Votre panier est vide.")
      }
    }

    function panier(){
        const localstorage = getTickets()
        setTicket(localstorage); 
    }
    function prixTotal(){
        setPrix(getTotalPrice())
    }

   async function makePayement(){

const stripe = await loadStripe("pk_test_51PHkaLP2tu9ynZbpin2TBN7BYHzEVgP3hHxvveOoMYg1wi8Y6MSqJYKl1NzwQ0I2X77CBzpsYFJaFiZeF8eH7mxu00A5gU3DKn");
const body = {
    product : ticket
}
const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(body) };

const response =await fetch ("http://localhost:3000/create-checkout-session",requestOptions)

const session = await response.json();

const result = stripe.redirectToCheckout({sessionId:session.id})

if(result.error){console.log(result.error);}

       
    }
    useEffect(()=>{ 
       panier()
       prixTotal()
       headPanier()  
      
       
       },[])
      
      
   
    return(<div className="panier">
             
             <div className="my-5">
                 <div className="p-5 text-center bg-body-tertiary">
                    <div className="container py-5">
                        <h1 className="text-body-emphasis">Votre Panier</h1>
                         <p className="col-lg-8 mx-auto lead">
                          {panierHeader}
                        </p>
                     </div>
                 </div>
             </div>
               
            <div >
                                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">JO24</th>
                        <th scope="col">Sport</th>
                        <th scope="col">Offre</th>
                        <th scope="col">Places</th>
                        <th scope="col">Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ticket.map((items)=>{return(
                        <tr key={items.id}>
                                      <th  scope="row"><img className="panier-img" src={items.image}/></th>
                                      <td >{items.sport}</td>
                                   <td >{items.offre}</td>
                                      <td >{items.quantity}</td>
                                      <td >{items.prix} €</td>
                        </tr>
                          
                        
                         
                    )})}
                    </tbody>
                    <tfoot>
                        <tr >
                            <th className="tfooter"  scope="row">Proceder au payement</th>
                            <td><Boutton click={makePayement} btn={"Payer"}/></td>
                            <th className="tfooter" colSpan="2" scope="row">Totals</th>
                            <td>{prix} €</td>
                          
                        </tr>
                    </tfoot>
                    </table>
                
            </div>
                <Footer/>
            </div>)
};
