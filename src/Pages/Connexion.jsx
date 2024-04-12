
import React, { useEffect, useState } from "react";
import {LogIN} from "../composants/FormCO";
import Footer from "../composants/footer";
import {Nav} from "../composants/header";
import  axios  from "axios";

function Connexion(){
    const [data,setData]=useState([])
    useEffect(()=>{
      const uti = async ()=>{
        try{
           const res = await axios.get("http://localhost:3000/users");
           console.log(res);
           setData(res.data);
        }catch(err){
                console.log(err);
        }
      };
      uti()
    },[])

    return (<div>
    <Nav/>
    <div>
        <h1>le back </h1>
        <ul>
        {data.map(uti=>(<li>{uti.prenom}</li>))}
        </ul>
        
    </div>
        <div className="login">
            <LogIN/>
        </div>
         
     <Footer/>
         
        </div>
      
    )}




export default Connexion;