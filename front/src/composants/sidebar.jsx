import React from 'react';



function Sidebar(props){
  function w3_open() {
    document.getElementById("mySidebar").style.display = "block"
    
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none"
  }
  return(
    <div className='menu'>
     
<div className=" burger-menu w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width:"200px"}} id="mySidebar">
  <button className=" w3-bar-item w3-button w3-large w3-hide-large" onClick={w3_close}>Close &times;</button>
  <h3 className="w3-bar-item">Menu</h3>
  <a href="/" className="w3-bar-item w3-button">Accuille</a>
  <a href="/compte" className="w3-bar-item w3-button">Menu principal</a>
  <a href="/utilisateur" className="w3-bar-item w3-button">Mes informations utilisateur</a>
  <a href="/ebillet" className="w3-bar-item w3-button">Mes E-billets</a>
  <a href="/panier" className="w3-bar-item w3-button">Mon panier</a>
  <a href="/offre" className="w3-bar-item w3-button">Billeterie</a>
</div>

<div className="w3-main " style={{marginLeft:"200px"}}>
<div className="w3-teal">
  <button className="w3-button w3-teal w3-xlarge w3-hide-large" onClick={w3_open}>&#9776;</button>
  <div className="w3-container">
  <h1>{props.titrem}</h1>
  </div>
</div>

<div className="w3-container contente-menu ">
{props.contentem}
</div>
   
</div>

    </div>
  )
}

export default Sidebar;