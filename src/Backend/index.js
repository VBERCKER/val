import express from "express";
import bodyParser from "body-parser";
import path from 'path'; 
import { dirname } from "path";
import { fileURLToPath } from "url";




const __dirname= dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get("/*", (req,res)=>{

    res.sendFile(path.join(__dirname,'.'))
})

app.listen(port,()=>{console.log("serveur fonctionne")});

