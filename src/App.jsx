import React from "react"; 
import Offrepage from "./Pages/Offre";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App(){

    return(
        <div>
       
        <Router>
            <Routes>
                <Route path="/offre" element={<Offrepage/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element ={<h1>Page introuvable !</h1>}/>
            </Routes>
        </Router>

        </div>
    )
}

export default App;