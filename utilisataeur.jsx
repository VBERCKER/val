import React from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import { FormUtI} from "../composants/FormCO";

export default function Utilisateur(){
    return (<div >

<Nav1/>
<div className="login">

<FormUtI/>
</div>

<Footer />
    </div>
        
    )
}