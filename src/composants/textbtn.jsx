import React from "react"; 
import {Card1} from "./card";
import Boutton from "./bouton";

function Textebtn (props){
    return( 
   <div id="sport" className="textebtn">
    <h2 > {props.textebtn}</h2>
    <p className="ptextbtn"> {props.textebtnp}  </p>
    <Boutton lien={props.lien} btn={props.textebtnbtn}/>
   
   </div>
    );
}

function Floter(){
    return(
        <div>
        <div class="container text-center">
  <div class="row">
    <div class=" p-3 col">
     <Card1 titlecard1= {"Basket 3x3"} pcard1={"Le basketball 3×3 se joue par équipes de trois joueurs, sur un demi-terrain ; les deux équipes attaquent et défendent le même panier, en fonction de qui a la possession. L’équipe en tête au bout de dix minutes de jeu, ou la première à atteindre 21 points, remporte le match. Le principe des tirs primés hors de la ligne des trois points est conservé, mais passe à deux points à l’extérieur de cette ligne et un point à l’intérieur."} image={"./public/img/sports-collectifs-aux-jo.jpg"}/>
    </div>
    <div class="p-3 col">
    <Card1 titlecard1= {"Breaking"} pcard1={"Breaking est un style de danse originaire des États-Unis dans les années 1970. Il a pris forme dans les fêtes de bloc animées du Bronx, émergeant de la culture hip hop, et se caractérise par des mouvements acrobatiques, un jeu de jambes stylisé et le rôle clé joué par le DJ et le MC (maître de cérémonie) pendant les batailles. Des compétitions internationales ont été organisées pour la première fois dans le monde entier dans les années 1990, popularisant la forme de danse à la fois parmi les communautés hip hop et le grand public en cours de route."} image={"./public/img/breaking-dance-hihop.jpg"}/>
    </div>
    <div class=" p-3 col">
    <Card1 titlecard1= {"Rugby à 7"} pcard1={"Le sport du rugby peut remonter à l'époque médiévale dans un certain nombre de pays européens, mais c'est entre 1845 et 1848 que les codes de rugby modernes ont été établis par des élèves d'une école de la ville anglaise de Rugby et de l'Université de Cambridge. En 1871, la première fédération nationale a été formée et, en 1886, l'International Rugby Board (maintenant connu sous le nom de World Rugby) a été créé."} image={"./public/img/MjAyNDAyNmFjNjU4ZGQyNTUzZjNjYzU5NTc5ODMyNWI2NzYxNWQ.avif"}/>
    </div>
    <div class="p-3 col">
    <Card1 titlecard1= {"Athlétisme"} pcard1={"L’athlétisme est le sport le plus ancien dont nous avons des traces, puisqu’il apparaît dès les Jeux Olympiques de l’Antiquité. Il est possible de trouver les champions d’athlétisme depuis 776 avant J-C. A l’époque, les Jeux Olympiques antiques comprennent des épreuves telles que des courses à pied et un pentathlon composé d’épreuves s’apparentant à une course, un saut en longueur, un lancer de disque, de la lutte et un lancer de javelot. Les premiers rassemblements modernes pouvant s’apparenter à des compétitions d’athlétisme ont lieu en Angleterre en 1840, dans le Shropshire. "} image={"./public/img/02544.jpg"}/>
    </div>
  </div>
</div>
          
        </div>
    )
}




export {Textebtn,Floter}; 

