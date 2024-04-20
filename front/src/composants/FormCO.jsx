import React, { useState } from "react";
import Buton from "./bouton";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import {  useLocation } from 'react-router-dom'
import { useAuth } from './auth'



      

function FormRE(){

    const [signin,setsingin]= useState({

        nom :"",
        prenom:"",
        nom_utilisateur: "",
        mail :"", 
        pwd:"",
      
    });

  

const handleChange =(e)=>{
    setsingin((prev)=> ({...prev,[e.target.name]:e.target.value}))
    
};
const handleClick = async e=>{
    e.preventDefault()
   
try{
    await axios.post("http://localhost:3000/add", signin)
    navigate("/connexion")
    setsingin("")
}catch(err){
    console.log(err)
}

}

const navigate= useNavigate();

  return(
    <div>
<form className="form">
    <p className="title">S'enregistrer </p>
    <p className="message">Enregister-vous maintenant et achtez vos places ! </p>
        <div className="flex">
        <label>
            <input className="input" name="prenom" onChange={handleChange} type="text" placeholder="" required=""/>
            <span>Prénom </span>
        </label>

        <label>
            <input className="input" name="nom" onChange={handleChange} type="text" placeholder="" required=""/>
            <span>Nom</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" onChange={handleChange} name="mail" placeholder="" required=""/>
        <span>Email</span>
    </label> 
        
    <label>
        <input className="input" type="password" onChange={handleChange} name="pwd" placeholder="" required=""/>
        <span>Mots de passe</span>
    </label>
    <label>
        <input className="input" type="password" onChange={handleChange} placeholder="" required=""/>
        <span>Confirmer le mots de passe</span>
    </label>
    <Buton click={handleClick} btn={"Enregistrer"}/>
    <p className="signin">Vous avez deja un compte ? <a href="#">Conectez-vous</a> </p>
</form>
    </div>
  )
}
function FormUtI(){
  return(
    <div>
<form className="form">
    <p className="title">Mofier vos informations </p>
    <Buton btn={"Mofidier"}/>
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder="" required=""/>
            <span>Prénom </span>
        </label>

        <label>
            <input className="input" type="text" placeholder="" required=""/>
            <span>Nom</span>
        </label>
    </div>  
        
    <label>
        <input className="input" type="password" placeholder="" required=""/>
        <span>Mots de passe</span>
    </label>
    <label>
        <input className="input" type="password" placeholder="" required=""/>
        <span>Confirmer le mots de passe</span>
    </label>
    <Buton btn={"Valider les modifications"}/>
    
</form>
    </div>
  )
}


function LogIN (){
    
    const [login,setlogin]= useState({

        username :"", 
        password :"",
      
    });
    const [erreur,setErreur]= useState("");

    const handleChange =(e)=>{
        setlogin((prev)=> ({...prev,[e.target.name]:e.target.value}))
        
    };
    const navigate= useNavigate();
    const location = useLocation()
    const auth = useAuth() 
    const redirectPath = location.state?.path || '/compte'

    const handleClick = async e=>{
        e.preventDefault()
     
        try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(login) };
        
        const result= await fetch('http://localhost:3000/connexion', requestOptions); 
        const response = await result.json();
        console.log(response); 
        if(response =='Autorisation')
        { 
            auth.login(login)
            navigate(redirectPath, { replace: true })
            
            
    }else {setErreur(response)} 
 }catch(error){console.log(error)} }
   
  
  return(
    <div>
    <form action="/compte" method="post">
  <p className="logo">PARIS 2024</p>
  <input type="text" onChange={handleChange} placeholder="Email" name="username" required=""/>
  <input type="password" onChange={handleChange} placeholder="Password" name="password" required=""/>
  <div style={{color:"red"}}> <p>{erreur}</p></div>
  <Buton click={handleClick} btn={"Se connecter"}/>
  <a href="#">Mots de passe oublié ?</a>
  <hr/>
<Buton lien={"/register"} btn={"Créer un nouveau compte"}/>
</form>
    
    </div>
  )
}


export {FormRE, LogIN, FormUtI}; 