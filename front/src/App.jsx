import React from "react"; 
import { AuthProvider } from "./composants/auth";
import Offrepage from "./Pages/Offre";
import Home from "./Pages/Home";
import Connexion from "./Pages/Connexion";
import Compte from "./Pages/compte"; 
import Enregistrement from "./Pages/Enregistrement";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Utilisateur from "../src/Pages/utilisataeur";
import Ebillet from "../src/Pages/ebillet";
import Panier from "../src/Pages/Panier";
import Admin from "./Pages/admin/admin"
import Ajouter from "./Pages/admin/Ajouter";
import OffreVisuel from "./Pages/admin/offresVisu";
import Supprimer from "./Pages/admin/supprimer";
import Update from "./Pages/admin/Update";


{
    /* The following line can be included in your src/index.js or App.js file */
  }
  import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from "./composants/login";
import { RequireAuth } from "./composants/requireAuth"

import { Nav } from "./composants/header";
  

 

function App(){

    return(
        
       <AuthProvider>

       <Router>
       <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/offre" element={<Offrepage/>}/>
                <Route path="/connexion" element={<Connexion/>}/>
                <Route path="/register" element={<Enregistrement/>}/>
                <Route path="/panier" element={<Panier/>}/>

                                { /*route protégées*/}
                                
                     <Route path="/compte" element={<RequireAuth><Compte/></RequireAuth>}>
                         <Route path="utilisateur" element={<Utilisateur/>}/>
                        <Route path="ebillet" element={<Ebillet/>}/>
                        <Route path="panier" element={<Panier/>}/>

                     </Route>

                    <Route path="/admin" element={ <Admin/>}>
                    <Route path="ajouter" element={<Ajouter/>}/>
                    <Route path="visuel" element={<OffreVisuel/>}/>
                    <Route path="supprimer" element={<Supprimer/>}/>
                    <Route path="modifier" element={<Update/>}/>
                    </Route>

                                 { /*test et autre*/}
               
                <Route path="*" element ={<h1>Page iouvable !</h1>}/>
               
            </Routes>
        </Router>

       </AuthProvider>
    
    )
}

export default App;