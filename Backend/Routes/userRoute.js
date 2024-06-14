import express from "express";


import { User } from "../models/userModels.js";

import * as userCtrl from "../controleurs/userControlers.js";

let router = express.Router()

/** les routes de user  */

router.get("",(req,res)=>{

     User.findAll()
         .then(users =>res.json({data:users}))
         .catch(err =>res.status(500).json({message : "Ereur data base :",error: err})) //err a supp secu 
    
    })


router.get("/:id",userCtrl.getUser)

router.patch("/:id")


router.delete("/:id")



export {router}