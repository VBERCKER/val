import React from "react";
import { Nav1 } from "../composants/header";
import Footer from "../composants/footer";
import { FormUtI} from "../composants/FormCO";
import Sidebar from "../composants/sidebar";

export default function Utilisateur(){
    return (<div >

<Nav1/>
<Sidebar titrem={"Mes informations utilisateurs"} contentem={<div>

    <div className="login">

<FormUtI/>
</div>
<div>

<Footer/>
</div>

</div>

}/>

    </div>
        
    )
}