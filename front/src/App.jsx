import React from "react"; 
import Offrepage from "./Pages/Offre";
import Home from "./Pages/Home";
import Connexion from "./Pages/Connexion";
import Compte from "./Pages/compte"; 
import Enregistrement from "./Pages/Enregistrement";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Utilisateur from "../src/Pages/utilisataeur";
import Ebillet from "../src/Pages/ebillet";
import Panier from "../src/Pages/Panier";
{
    /* The following line can be included in your src/index.js or App.js file */
  }
  import 'bootstrap/dist/css/bootstrap.min.css';

 

function App(){

    return(
        <div>
       
        <Router>
            <Routes>
                <Route path="/offre" element={<Offrepage/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Enregistrement/>}/>
                <Route path="/connexion" element={<Connexion/>}/>
                <Route path="/compte" element={<Compte/>}/>
                <Route path="/utilisateur" element={<Utilisateur/>}/>
                <Route path="/ebillet" element={<Ebillet/>}/>
                <Route path="/panier" element={<Panier/>}/>
                <Route path="*" element ={<h1>Page iouvable !</h1>}/>
            </Routes>
        </Router>

        </div>
    )
}

export default App;