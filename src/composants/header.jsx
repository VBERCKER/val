import React from "react";


function Nav(){
  return (<div className="navbar1">
  <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/"><img src="./public/img/origine-logo-JO-Paris-2024-870x600.jpg" width="50" height="35"/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Acceuil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#offre">Offres / Billeterie</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#sport">Les sports</a>
        </li>
      </ul>
    
    </div>
  </div>
</nav> 
</div>
 )
};

function Header(props)

{ return (<div id="header" className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src= {props.src} className="d-block mx-lg-auto img-fluid" alt={props.alt} width="800" height="600" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{props.h1}</h1>
        <p className="lead">{props.p}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">{props.btn1}</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">{props.btn2}</button>
        </div>
      </div>
    </div>)}; 

    export {Header,Nav}; 