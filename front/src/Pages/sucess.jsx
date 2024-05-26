import React,{useState,useEffect} from "react";

import Footer from "../composants/footer";
import {Link} from "react-router-dom";




export default function Sucess(){

    return(<div className="panier">
             
             <div className="my-5">
             
                 <div className="p-5 text-center bg-body-tertiary">
                    <div className="container py-5">
                    <div ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg></div>
                        <h1 className="text-body-emphasis">Votre panier est validé ! </h1>
                         <p className="col-lg-8 mx-auto lead">
                         Reandez-vous dans <Link to="../ebillet">mes e-bilets</Link>  pour accéder à vos tickets. 
                        </p>
                     </div>
                 </div>
             </div>
               
           
                <Footer/>
            </div>)
};
