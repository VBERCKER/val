import React from "react"; 
import Boutton from "./bouton";


function Float(){
    return (
        <div>
   <div id="offre" className="offre-titre"><h2>Selectionnez une offres !</h2></div>
        <div class="container text-center">
        <div class=" p-3 row">
          <div class="col">
            
            <Boutton btn={"Offre Solo"}/>
          </div>
          <div class="col">
            <p>Assister en "solo" aux épreuves olympiques ? On vous fait profiter de nombreux bons plans de dernière minute. Assiter seul aux épreuves est l'opportunité de découvrir des sports selon vos envies.
            Osez sortir des sentiers battus, même seul, et attardez-vous à votre guise pour décourir de nouvelles activités olympiques. Ces moments de rêverie loin de chez vous constituent les meilleurs souvenirs.</p>
            
          </div>
         
        </div>
        <div class=" p-3 row">
          <div class="col">
            
            <Boutton btn={"Offre Duo"}/>
          </div>
          <div class="col">
            <p>L'option "Duo" permet aux visiteurs, s'ils le souhaitent, de réserver deux places pour les événements sportifs de Paris 2024. Les deux places sont vendues au même tarif, et la seconde place peut-être offerte par le visiteur à n'importe quel accompagnateur.  </p>
            
          </div>
         
        </div>
        <div class=" p-3 row">
          <div class="col">
            
            <Boutton btn={"Offre Familiale"}/>
          </div>
          <div class="col">
            <p>L'offre "familiale" vous permet d'assiter aux epreuves avec les membres de votre famille. A 2 ou a plusisurs venez décrourir les differents sports olympiques de Paris 2024. Les places sont vendues au même tarif pour chacun des membres de votre famille. </p>
            
          </div>
         
        </div>
      </div>

        </div>
     
    )
}

export default Float;

