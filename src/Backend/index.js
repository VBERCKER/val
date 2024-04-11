import express from "express";
import cors from "cors";
import bodyParser from "body-parser";




const app=express();
const port=3000;
const corsOptions={
origin :"*",
credentials:true,
optionSuccessStatus:200
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors(corsOptions  ))

app.post("/compte", (req,res)=>{

    res.redirect("/")
})

app.listen(port,()=>{console.log("serveur fonctionne")});

