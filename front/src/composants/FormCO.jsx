import React, { useState } from "react";
import Buton from "./bouton";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import {  useLocation } from 'react-router-dom'
import { useAuth } from './auth';

import * as yup from 'yup';
import {userprenom,usernom,usermail,userpwd} from './validationForm';
import { setCookie } from "./cookies";
import { accountService } from "./auth1/servicetoken"
import { jwtDecode } from "jwt-decode";
import Boutton from "./bouton";




      

function FormRE(){

    const [signin,setsingin]= useState({

        nom :"",
        prenom:"",
        nom_utilisateur: "",
        mail :"", 
        pwd:"",
        confirmpwd :"",
      
    });

 const [nom,setnom]=useState("")
 const [prenom,setprenom]=useState("")
 const [mail,setemail]=useState("")
 const [pwd,setpwd]=useState("")
 const [confirmpwd,setconfirmpwd]=useState("")


const handleChange =async (e)=>{
     
    let verifprenom  ={
        prenom: signin.prenom,
    };
    let verifnom  ={
        nom: signin.nom,
    };
    let verifmail  ={
        mail: signin.mail,
    };
    let verifpwd  ={
        pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd)
    const validPrenom = await userprenom.isValid(verifprenom)
    const validnom = await usernom.isValid(verifnom)
    const validmail = await usermail.isValid(verifmail)
    
    if(validnom==false){console.log('Entrez votre nom')}else{setnom("")}
    if(validPrenom==false){console.log('Entrez votre prenom')}else{setprenom("")}
   
    if(validmail==false){console.log('Entrez un email valide')}else{setemail("")}
    if(validpwd==false){console.log('Entrez un mot de passe')}else{setpwd("")}


    setsingin((prev)=> ({...prev,[e.target.name]:e.target.value}))
    
};

const handleClick = async e=>{
    e.preventDefault()
     
    let verifprenom  ={
        prenom: signin.prenom,
    };
    let verifnom  ={
        nom: signin.nom,
    };
    let verifmail  ={
        mail: signin.mail,
    };
    let verifpwd  ={
        pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd)
    const validPrenom = await userprenom.isValid(verifprenom)
    const  validnom = await usernom.isValid(verifnom)
    const validmail = await usermail.isValid(verifmail)

    if(validPrenom ==false ){setprenom('Entrez votre prénom')}
    else if (validnom ==false ){setnom('Entrez votre nom') }else if(validPrenom ==false ){setprenom('Entrez votre prénom')}
else if(validmail ==false ){setemail('Entrez votre email')}
   
   else if(validpwd==false) {setpwd('Entrez un mots de passe valide.') }
   
   else if(signin.pwd !== signin.confirmpwd)(setconfirmpwd('Les mots de passe ne sont pas identiques'))
   
   else{

   
try{
    await axios.post("http://localhost:3000/add", signin)
   
    navigate("/connexion")
    setsingin("")

}catch(err){
    console.log(err)
}

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
            <input className="input"  name="prenom" onChange={handleChange} type="text" placeholder="" required=""/>
            <span>Prénom  </span>
            <span style={{color:"red"}}>{prenom}</span>
        </label>

        <label>
            <input className="input" name="nom" onChange={handleChange} type="text" placeholder="" required=""/>
            <span>Nom</span>
            <span style={{color:"red"}}>{nom}</span>
        </label>
    </div>  
            
    <label>
        <input className="input"  type="email" onChange={handleChange} name="mail" placeholder="" required=""/>
        <span>Email </span>
        <span style={{color:"red"}}>{mail}</span>
    </label> 
        
    <label>
        <input className="input" type="password" onChange={handleChange} name="pwd" placeholder="" required=""/>
        <span>Mots de passe</span>
        <span style={{color:"red"}}>{pwd}</span>
    </label>
    <label>
        <input className="input" type="password" onChange={handleChange} name='confirmpwd' placeholder="" required=""/>
        <span>Confirmer le mots de passe</span>
        <span style={{color:"red"}}>{confirmpwd}</span>
    </label>
    <Buton click={handleClick} btn={"Enregistrer"}/>
    <p className="signin">Vous avez deja un compte ? <a href="#">Conectez-vous</a> </p>
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
    const redirectPathAdmin = '/admin'

    const handleClick = async e=>{
        e.preventDefault()
     
        try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(login) };
        
        const result= await fetch('http://localhost:3000/connexion', requestOptions); 
        const response = await result.json();
        console.log(response); 


        if(response[0].name =='Autorisation' && response[1].user.role === 'false' )
            { 
                accountService.saveToken(response[2].access_token)
                console.log(response[1].user.role)
                auth.login(login)
                setCookie('user',response[1].user.id,2)
    
                navigate(redirectPath, { replace: true })
        }else 
        if(response[0].name =='Autorisation' && response[1].user.role === 'true' )
        {  
            accountService.saveTokenAdmin(response[2].access_token)
            console.log(response[2].access_token)
                auth.login(login)
                            setCookie('admin',response[1].user.id,2)
                        
                            navigate(redirectPathAdmin, { replace: true })

    }  else {setErreur(response)} 
 }catch(error){console.log(error)} }
   
 //token 
 
async function token1(){

    const token = localStorage.getItem('token');
    const tokenadmin = localStorage.getItem('admin');
  /*  const result = token ? tokenValid(token) : false ; 
    console.log(result)
   if(false===result){accountService.logout }else{return result}; */
    try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: {'Authorization':`Bearer ${token}` }, redirect: "follow", referrerPolicy: "no-referrer"};
        
    const result= await fetch('http://localhost:3000/token', requestOptions); 
    const response = await result.json();
    console.log(response); 
    if(token){

        if(response === "ok")
            {  
                    auth.login(login)
                    navigate(redirectPath, { replace: true })
           
           }

        
    }else if(tokenadmin){
        {  
            auth.login(login)
            navigate(redirectPathAdmin, { replace: true })
   
   }

    }
   

   }catch(error){console.log(error)} 

/*
  function tokenValid(token){
       const {exp}=jwtDecode(token);
       if(exp*1000> new Date().getTime()){return true;}return false;
  }
   
*/

}
    

  token1()
 
  /*async function test2(e){
    e.preventDefault()

    try{ const requestOptionst = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: {'Authorization':`Bearer ${token}` }, redirect: "follow", referrerPolicy: "no-referrer"};
    const result= await fetch('http://localhost:3000/test/1', requestOptionst); 
    const response = await result.json();
    console.log(response); 
    

   }catch(error){console.log(error)} }

  
  test2()*/
  /***GOOGLE  */
  const Google = async e=>{
    e.preventDefault()
 
    try{ const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
    
    const result= await fetch('http://localhost:3000/auth/google', requestOptions); 
    const response = await result.json();
    console.log(response); 


    if(response[0].name =='Autorisation'  && response[1].user.role === 'false')
        { 
            accountService.saveToken(response[2].access_token)
            console.log(response[1].user.role)
            auth.login(login)
            setCookie('user',response[1].user.id,2)

            navigate(redirectPath, { replace: true })
    }else  {setErreur(response)} 
}catch(error){console.log(error)} }

  
  /********* */
  return(
    <div>
    <form action="compte" method="post">
  <p className="logo">PARIS 2024</p>
  <input type="text" onChange={handleChange} placeholder="Email" name="username" required=""/>
  <input type="password" onChange={handleChange} placeholder="Password" name="password" required=""/>
  <div style={{color:"red"}}> <p>{erreur}</p></div>
  <Buton click={handleClick} btn={"Se connecter"}/>
  <a href="#">Mots de passe oublié ?</a>
  <hr/>

<div className="col-sm-12">
        <div className="card">
          <div className="card-body">
         <Boutton click={Google} btn={"test"}/>
          <a class="btn btn-block" href="http://localhost:3000/auth/google" role="button">
              <i class="fab fa-google"></i>
              Sign In with Google
            </a>
            
          </div>
        </div>
      </div>
</form>
    

   
    </div>
  )
}



export {FormRE, LogIN}; 