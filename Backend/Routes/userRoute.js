import express from "express";


import { User } from "../models/userModels.js";

import * as userCtrl from "../controleurs/userControlers.js";

let router = express.Router()

/** les routes de user  */

router.get("/test",(req,res)=>{

     User.findAll()
         .then(users =>res.json({data:users}))
         .catch(err =>res.status(500).json({message : "Ereur data base :",error: err})) //err a supp secu 
    
    })


router.get("/users/:id",(req,res )=>{
   
    const id = parseInt(req.params.id)
    const sql= "SELECT * FROM utilisateur WHERE id=(?)";
    console.log(id)
    db.query(sql,[id], (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })
    
})

router.patch("/:id")


router.delete("/:id")



export {router}