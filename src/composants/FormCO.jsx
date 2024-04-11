import React from "react";
import Buton from "./bouton";


function FormRE(){
  return(
    <div>
<form class="form">
    <p class="title">S'enregistrer </p>
    <p class="message">Enregister-vous maintenant et achtez vos places ! </p>
        <div class="flex">
        <label>
            <input class="input" type="text" placeholder="" required=""/>
            <span>Prénom </span>
        </label>

        <label>
            <input class="input" type="text" placeholder="" required=""/>
            <span>Nom</span>
        </label>
    </div>  
            
    <label>
        <input class="input" type="email" placeholder="" required=""/>
        <span>Email</span>
    </label> 
        
    <label>
        <input class="input" type="password" placeholder="" required=""/>
        <span>Mots de passe</span>
    </label>
    <label>
        <input class="input" type="password" placeholder="" required=""/>
        <span>Confirmer le mots de passe</span>
    </label>
    <Buton btn={"Enregistrer"}/>
    <p class="signin">Vous avez deja un compte ? <a href="#">Conectez-vous</a> </p>
</form>
    </div>
  )
}
function FormUtI(){
  return(
    <div>
<form class="form">
    <p class="title">Mofier vos informations </p>
    <Buton btn={"Mofidier"}/>
        <div class="flex">
        <label>
            <input class="input" type="text" placeholder="" required=""/>
            <span>Prénom </span>
        </label>

        <label>
            <input class="input" type="text" placeholder="" required=""/>
            <span>Nom</span>
        </label>
    </div>  
        
    <label>
        <input class="input" type="password" placeholder="" required=""/>
        <span>Mots de passe</span>
    </label>
    <label>
        <input class="input" type="password" placeholder="" required=""/>
        <span>Confirmer le mots de passe</span>
    </label>
    <Buton btn={"Valider les modifications"}/>
    
</form>
    </div>
  )
}


function LogIN (){
  return(
    <div>
    <form action="/compte" method="post">
  <p class="logo">PARIS 2024</p>
  <input type="text" placeholder="Email" name="email" required=""/>
  <input type="password" placeholder="Password" name="pwd"required=""/>
  <Buton btn={"Se connecter"}/>
  <a href="#">Mots de passe oublié ?</a>
  <hr/>
<Buton btn={"Créer un nouveau compte"}/>
</form>
    
    </div>
  )
}


export {FormRE, LogIN, FormUtI}; 