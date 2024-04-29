import React,{useState,useEffect} from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import Sidebar from "../composants/sidebar";
import { getTotalPrice,getTickets } from "../composants/gestionpanier";
import Boutton from "../composants/bouton";
import { useNavigate} from "react-router-dom";


export default function Ebillet(){

    const [ticket,setTicket]=useState([])
    const [prix,setPrix]=useState([])
    const [panierHeader,setPanierHeader]=useState("Verifiez votre panier, puis passez au payement.")
    const navigate= useNavigate()
   
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

    function handleClick(){
       
        navigate("/compte/panier")
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
                            <td><Boutton click={handleClick} btn={"Payer"}/></td>
                            <th className="tfooter" colSpan="2" scope="row">Totals</th>
                            <td>{prix} €</td>
                          
                        </tr>
                    </tfoot>
                    </table>
                
            </div>
                <Footer/>
            </div>)
};
