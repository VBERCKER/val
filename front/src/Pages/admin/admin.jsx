import React, { useState } from 'react'
import Buton from '../../composants/bouton'
import Sidebar from '../../composants/template/sidebar'



export default function Admin () {
  const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
  
  const [sport,setsport]=useState([])
  const [sportfilter,setsportfilter]=useState([])
  const [filter,setfilter]=useState([])

function sportall(){
  fetch(`http://localhost:3000/offreadminall`,requestOptions)
  
  .then((response)=>{
    return response=response.json()
  } )
  .then((result)=>{const data =result
 setsport(data)
}
)
  .catch(err=>console.log(err));

}
sportall()

function handleSport(e){
  setsportfilter(e.target.value)
  
}


  async function handleClick(e){
    e.preventDefault()
    
 
    await fetch(`http://localhost:3000/offreadminfilter/${sportfilter}`,requestOptions)
  
      .then((response)=>{
        return response=response.json()
      } )
      .then((result)=>{const data =result
      
        setfilter(data)
       
    }
    )
      .catch(err=>console.log(err));
 
}



    
  return (
    <div className='page' >
    
    <Sidebar  lienTItre2={"modifier"}  lienTItre3={"supprimer"} lienTItre4={"vente"} lienTItre1={"ajouter"} lienmenuP={"/admin"} menuP={"Home"} menuTitre1={"Ajouter une offre"} menuTitre4={" Les ventes"} menuTitre2={"Modifier une offre"}  menuTitre3={"Supprimer une offre"}  titrem={"Compte admin"} content={  <div className="container text-center">
    <h2>Compte administrateur </h2>
    <p>Selectionner une option dans le menu latéral de gauche pour : Ajouter, supprimer , modifier une offre et voir les ventes. </p>
    <form style={{width:"100%"}}>
    <div >
    <label for="sport" style={{fontSize:"20px"}}>sport:</label>
  <select style={{width:"50%", margin:"40px"}} name="sport" onChange={ handleSport}>
    <option></option>
    {sport.map((items)=>{return(<option key= {items.id} value={items.id}>{items.Sport}</option>)})}
   
  </select>
 

    <Buton click={handleClick} btn={"filtrer"}/> 
    </div>
    
    
    </form>
    
   
    <table className="table caption-top">
  <caption>Offres JO 2024</caption>
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nom de l'offre</th>
      <th scope="col">Places disponibles</th>
      <th scope="col">Prix de l'offre</th>
      <th scope="col">Sport</th>
      <th scope="col">identifiant du Sport</th>
    </tr>
  </thead>
  <tbody>
  {filter.map((items)=>{return(

    <tr>
      <th key={items.id} scope="row">{items.id}</th>
      <td>{items.Offre}</td>
      <td>{items.Places_dispo}</td>
      <td>{items.Prix_offre}</td>
      <td>{items.Sport}</td>
      <td>{items.SPORT_ID}</td>
    </tr>

  )})}
   
   
  </tbody>
</table>



    
        </div>} />

     
   
    </div>
  )
}
