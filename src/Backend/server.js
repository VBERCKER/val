import express from "express";
import bodyParser from "body-parser";


import mysql from "mysql2";
import cors from "cors"; 







const app=express();


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
    var cles =Math.floor(Math.random()*1000000);

    const add= "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur) VALUES(?)";
    const values=[
        req.body.nom,
        req.body.prenom,
        req.body.nom +"."+req.body.prenom,
        req.body.mail,
        req.body.pwd,
        cles

    ];
   
    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("vous etes enregistré");
    })
})

app.get("/connexion", async (req,res)=>{


const mail = [req.body.mail]
const pwd = req.body.pwd;
const connexion = "SELECT mail FROM utilisateur WHERE mail =(?)";

try{
    const result= db.query(connexion,[mail]);
    if(result.rows.length>0){
        const utilisateur = result.rows[0];
        const storedPwd =utilisateur.pwd;

        if(pwd === storedPwd){
            res.json('ok');
        }else{res.json('incorect pwd')}
    }else{
        res.json('incoret mail')
    }
    }catch(err){console.log}

}
)









app.listen(process.env.SERVER_PORT,()=>{console.log("serveur fonctionne")});
