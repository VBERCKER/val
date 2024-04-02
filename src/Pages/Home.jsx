import React from "react"; 
import {Header} from "../composants/header";
import {Nav} from "../composants/header";
import {Carte} from "../composants/card"; 
import {Textebtn, Floter} from "../composants/textbtn";
import Float from "../composants/float";
import Footer from "../composants/footer";

function Home(){

    return(
        <div>
        <Nav/>
        <Header src = {"./public/img/1200x680_sc_f1yhtk6wcamaltg.jpg"}
         alt={"dessin du champs de mars avec une foule popualire"} 
         h1={"Jeux Olympique Paris 2024"}
           p= {"test"} 
           btn1= {"Activitées"}
           btn2= {"Nos offres"}
         />
        <Carte 
        hsport={"Les sports"} psport={"Pour les Jeux Olympique 2024 ! La France presente 3 nouvelles activités sportives."}
        hoffre={"Nos offres."} poffre={"Pour Paris 2024, nous proposons 3 offres pour acheter vos billets. Seul, a deux ou en famille, venez souteznir nos athlètes !"}
        hjeu={"L'histoire des jeux Olympique."} pjeu={"128 ans d'histoire depuis la création des jeux olympique en 1896."}
        sport={"./public/img/design-sans-titre-7.png"} sportalt={"image de sportif"}
            offre={"./public/img/billets-Jeux-olympiques-Tokyo-2020-tickets.jpg"} offrealt={"image de billet"}
            jeu={"./public/img/63da3a7e85f00_modele-brouillon.jpg"} jeualt={"logo paris 2024"}
        />
       <Textebtn  textebtn={"Les sports olympiques Paris 2024."}   textebtnp={"Pour les jeux olymppique 2024, la France va proposer 41 sports olympique avec 4 sports additonnels. Athlétisme, aviron, badminton, basketball, basketball 3×3, boxe, canoë sprint, canoë-kayak slalom, cyclisme sur piste, cyclisme sur route, BMX freestyle, BMX racing, Mountain bike (VTT), escrime, football, golf, gymnastique artistique, gymnastique rythmique, trampoline, haltérophilie, handball, hockey, judo, lutte, pentathlon moderne, rugby, natation, natation artistique, natation marathon, plongeon, waterpolo, sports équestres, taekwondo, tennis, tennis de table, tir, tir à l’arc, triathlon, voile, volleyball, volleyball de plage."} textebtnbtn={"Nos offres"}/>
       <Floter/>
      <Float/>
     <Footer/>

        </div>
    )
}

export default Home;