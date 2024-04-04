import React from "react"; 
import Offrepage from "./Pages/Offre";
import Home from "./Pages/Home";
import Connexion from "./Pages/Connexion";
import Compte from "./Pages/compte"; 
import Enregistrement from "./Pages/Enregistrement";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


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
                <Route path="*" element ={<h1>Page introuvable !</h1>}/>
            </Routes>
        </Router>

        </div>
    )
}

export default App;