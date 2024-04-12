import express from "express";
import bodyParser from "body-parser";


import mysql from "mysql2";``
import cors from "cors"; 








const app=express();
const port=3000;
const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "valentin.6",
    database : "JO24"
})

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


app.get("/", (_,res)=>{

    return res.send({msg:"hello le back"});
})

app.get("/users",(_,res)=>{
    const sql= "SELECT * FROM utilisateur";
    db.query(sql, (err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
    })
})

app.post("/add",(req,res)=>{
    const add= "INSERT INTO utilisateur(nom,prenom,mail,pwd) VALUES(?)";
    const values=[
        req.body.nom,
        req.body.prenom,
        req.body.mail,
        req.body.pwd,

    ];

    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("vous etes enregistré");
    })
})
app.listen(port,()=>{console.log("serveur fonctionne")});

