import React from "react";
import { Outlet } from "react-router-dom";
import { Nav1 } from "./header";

export default function Test (){

    return 
    (<div> 
    
        <Nav1/>
        <Outlet/>
    
    </div>)
}