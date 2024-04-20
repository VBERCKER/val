import React from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import { CardEbillet } from "../composants/card";
import Sidebar from "../composants/sidebar";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../composants/auth'



const ebilet =[{billet : "Basket 3*3 "},{billet:"Football"},{billet:"Rugby à 7"},{billet:"Rugby à 7"},{billet:"Rugby à 7"},{billet:"Rugby à 7"},{billet:"Rugby à 7"},{billet:"Rugby à 7"},{billet:"Rugby à 7"}]

 export default function Ebillet(){

        
   

    return(<div>
   <div >
            <div className="container text-center ">

         <div className="row row-cols-3 g-5  ">
  
 {ebilet.map((items)=>{return(<div className="col "> <CardEbillet titre={items.billet}/></div>)})}
         </div>
  
  
            </div>
            <Footer/>
        </div> 
    
        </div>)
};

