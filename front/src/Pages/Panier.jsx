import React,{useState,useEffect} from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import Sidebar from "../composants/sidebar";
import { getTotalPrice,getTickets,remove,changeQuantity } from "../composants/gestionpanier";
import Boutton from "../composants/bouton";
import { useNavigate} from "react-router-dom";


export default function Ebillet(){

    const [ticket,setTicket]=useState([])
    const [prix,setPrix]=useState([])
    const [panierHeader,setPanierHeader]=useState("Verifiez votre panier, puis passez au payement.")
    const navigate= useNavigate()
    const [change,setChange]=useState("")
   var paniertaille =ticket.length
   

    function panier(){
        const localstorage = getTickets()
        setTicket(localstorage); 
    }

    function headPanier(){
       
      if(paniertaille ){
       
        setPanierHeader("Votre panier est vide.")
      }
    }
   

    function handleChange(e){
        console.log(change)
        setChange(e.target.value)
    }
  
    function prixTotal(){
        setPrix(getTotalPrice())
    }

    function handleClick(){
       
        navigate("/compte/PanierValider")
    }
    useEffect(()=>{ 
       panier()
       prixTotal()
       headPanier()  
      
       
       },[])

     
   
      
   
    return(<div className="page">
             
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
                        <th scope="col">Supprimer</th>
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
                                      <td ><button onClick={()=>{remove(items);document.location.reload(false)}}>supprimer</button></td>
                        </tr>
                          
                        
                         
                    )})}
                    </tbody>
                    <tfoot>
                        <tr >
                            <th className="tfooter"  scope="row">Proceder au payement</th>
                            <td><Boutton click={handleClick} btn={"Payer"}/></td>
                            <th className="tfooter" colSpan="3" scope="row">Totals</th>
                            <td>{prix} €</td>
                          
                        </tr>
                        
                    </tfoot>
                    </table>
                   
            </div>
                
            </div>)
};