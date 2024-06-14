import React,{useState} from 'react'
import Buton from '../../composants/bouton'





export default function Update () {
const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };

   
const [sport, setsport]=useState({
    sport : "",
    Offre :"",
    Place_offre:"",
    Prix_offre:"",
    Places_dispo: "",
    SPORT_ID :"", 
    id:""
 
})

function handleChange(e){
    setsport(e.target.value)
    
}

function handleClickSport(e){
    e.preventDefault()
    fetch(`http://localhost:3000/offreadmin/${sport}`,requestOptions)
  
      .then((response)=>{
        return response=response.json()
      } )
      .then((result)=>{const data =result
        
        setsport({
            sport : data[0].Sport,
            Offre :data[0].Offre,
            Place_offre:data[0].Place_offre,
            Prix_offre:data[0].Prix_offre,
            Places_dispo:data[0].Places_dispo,
            SPORT_ID :data[0].SPORT_ID, 
            id : data[0].id}
         
        )
        hiddenform()
        cahcerLeBtn()
      
    }
    )
      .catch(err=>console.log(err));
 
}

 
   
    const requestOptions1 = { method: 'DELETE', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" }; 
    
    async function handleClick (e){
        e.preventDefault()
        
          
    try{
       const result =  await fetch(`http://localhost:3000/offreadmindelete/${sport}`,requestOptions1)
       console.log(result)
       console.log(sport)
        alert("L'offre est supprimée !")
       setsport({
        sport : "",
        Offre :"",
        Place_offre:"",
        Prix_offre:"",
        Places_dispo: "",
        SPORT_ID :"", 
        id:""
       })


        
    }catch(err){
        console.log(err)
    }
    }

    const [hidden,setForm]=useState("hidden") 

    function hiddenform(){
        
        setForm("text")
    }
    const [hiddenbtn,sethiddenbtn]=useState("hidden-btn-compteadmin-modifier")
    function cahcerLeBtn(){
        sethiddenbtn("")
    }

  return (
    <div >
     
      <form className="form">
    <p className="title">Supprimer une offre</p>
    
    <label>
            <input className="input"  onChange={handleChange} name="sport" type="text"  required=""/>
            <span> id de l'offre à supprimer </span>
          
        </label>
        <Buton click={handleClickSport} btn={"valider le sport"}/>
       
        <div className="flex-block">
        <label>
        
            <input type={hidden} className="input" value={sport.Offre} onChange={handleChange} name="Offre" placeholder={sport.Offre} required=""/>
            <span>Nom de l'offre</span>
          
        </label>
        <label>
            <input type={hidden} className="input" value={sport.Place_offre}  onChange={handleChange} name="Place_offre" placeholder={sport.Place_offre} required=""/>
            <span>Place dans l'offre</span>
           
        </label>

        <label>
            <input type={hidden} className="input"  value={sport.Places_dispo} onChange={handleChange} name="Places_dispo" placeholder={sport.Places_dispo} required=""/>
            <span>Places Disponibles</span>
            
        </label>
        <label>
            <input type={hidden} className="input" value={sport.Prix_offre} onChange={handleChange} name="Prix_offre" placeholder={sport.Prix_offre} required=""/>
            <span>Prix de l'offre </span>
            
        </label>
    </div>  
    <label>
        <input type={hidden} className="input"  onChange={handleChange} name="SPORT_ID" placeholder={sport.sport} required=""/>
        <span>Sport</span>
        
    </label>
      <div className={hiddenbtn}>
         <Buton click={handleClick} btn={"Supprimer"}/>
      </div>
     
  
    
</form>
    </div>
  )
}
