import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors"; 
//crypter et token
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
//session
import session from "express-session";
import passport from "passport"; 
import {Strategy} from "passport-local"; 
import flash from 'express-session'

import cookieParser from "cookie-parser";


const app=express();

// conexion bd 
const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "valentin.6",
    database : "JO24"
})
const whitelist = ['http://localhost:3000','http://localhost:5173', /** other domains if any */ ]
 const corsOptions = { 
    credentials: true, 
    origin: function(origin, callback) { 
        if (whitelist.indexOf(origin) !== -1) 
        { callback(null, true) 
        } else {
             callback(new Error('Not allowed by CORS')) 
            } 
        }
     } 
     
     
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors(corsOptions))

//session 
app.use(session({
    secret : "TROPSECRETWORD",   // permet de securiser la session 
    resave: false, // enrgistrement de la session dans la bd meme si serveur redemarer ou autre la session persiste
    saveUninitialized : true, // save une session dans la store 
    cookie:{ secure : false,
        maxAge : 1000 * 60 * 60 * 24,    //temps en miliseconde expiration cookies 
    }

}))

app.use(passport.initialize());
app.use(passport.session());
//******************************* */

/// autorisation d'accès 
app.get('/autorisation', (req,res)=>{ // a lier avec les pages back souvegarde un cookio 


    if(req.isAuthenticated()){
        res.json([{name:'Autorisation'},{user : req.user}])
        
      
    }else {
        res.json('NON')
        
    }

    
})

// reste connexion
app.get("/", (_,res)=>{

    return res.send({msg:"hello le back"});
})

//test 2
app.get("/users/:id",(req,res )=>{
   
    const id = parseInt(req.params.id)
    const sql= "SELECT * FROM utilisateur WHERE id=(?)";
    console.log(id)
    db.query(sql,[id], (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })
    
})

// ajout utilisateur 
app.post("/add", async(req,res)=>{
    var cles =Math.floor(Math.random()*1000000);
    const pwd = req.body.pwd; 
    const passHash = await bcrypt.hash(pwd,10)

    const add= "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur) VALUES(?) RETURNING *";
    const values=[
        req.body.nom,
        req.body.prenom,
        req.body.nom +"."+req.body.prenom,
        req.body.mail,
        passHash,
        cles

    ];
   
    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("vous etes enregistré");
    })
})

//login 

app.post("/connexion",passport.authenticate("local",{ 
    successRedirect : "/autorisation",
    failureRedirect : "/nonautorisation", 
    
})
)
// route autorisation 

app.get("/valider", (req,res)=>{

 
    return res.redirect("/autorisation");
   
})

app.get("/nonautorisation", (_,res)=>{

    return res.json("Email ou mots de passe incorect");
})

// token pas encore utiisé
app.get("/jwt",(req,res)=>{

    const createTokenFromJson = (jsonData, option ={})=>{
        try{
                const secretKey = "test" // cles a crypter et complexifier 
                const token = jwt.sign(jsonData, secretKey,option )
                return token 


        }catch(err){console.log("err:", err.message)
        return null
    } }
    const jsonData =({email :"valou" , pwd : "ert"}) /// les datas a recup 
    const token = createTokenFromJson(jsonData); 

    if(token){
        res.json({status: true, token : token })
    }else { res.json({status : false })}

})



// verifier la connesion pour la session on copie cole le bloc de connexion //plus besoin de req.boby 
passport.use(new Strategy(async function verify(username,password,cb){ // doit matcher avec lo from 
console.log(username);

const connexion = "SELECT * FROM utilisateur WHERE mail =(?) ";

    try{
          db.query(connexion,[username],async (err,data)=>{

            if(data.length>0){   //verif email 
                const user =data[0];
                const bdPwd =user.pwd;
              
               bcrypt.compare(password, bdPwd ,(err, result)=>{
                console.log(result) /// verif pwd et conecté 
                    if(err){
                      return cb(err)
                    }else{
                        if(result){
                            return cb(null, user);  //va permettre d'accceer aux info uti avce req.user plus tard
                        } else{
                            return cb(null, false);
                        }
                    }
            });
            }else{return cb("Utilisateur non trouvé")

        }})
    
        }catch(err){return cb(err);}
}));

passport.serializeUser((user, cb)=>{  //stocker les donne utilisateur en local 
cb(null,user); 

});

passport.deserializeUser((user, cb)=>{  //a veerif les donnees utilisateur en local 
    cb(null,user); 
    
    });

// express 
app.listen(process.env.SERVER_PORT,()=>{console.log("serveur fonctionne")});