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
    const role = "user"

    const add= "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur,role) VALUES(?) ";
    const values=[
        req.body.nom,
        req.body.prenom,
        req.body.nom +"."+req.body.prenom,
        req.body.mail,
        passHash,
        cles,
        role

    ];
   
    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("vous etes enregistré");
    })
})




// ajout offres
app.post("/addoffres", async(req,res)=>{
   
   

    const add= "INSERT INTO Offre(Offre,Place_offre,Prix_offre,Places_dispo,SPORT_ID) VALUES(?) ";
    const values=[
        req.body.Offre,
        req.body.Place_offre,
        req.body.Prix_offre,
        req.body.Places_dispo,
        req.body.SPORT_ID,
    ];
   
    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("Offre ajoutée");
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

// offre 
app.get("/sport",(req,res)=>{

    const offre = "SELECT * FROM Sport ";

    db.query(offre, (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })

})
app.get("/offre",(req,res)=>{

    const offre = "SELECT * from Sport JOIN Offre ON Sport.id = SPORT_ID";

    db.query(offre, (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })

})

//voir les offre admin  sport 
app.get("/offreadminall",(req,res)=>{
    
    const sport = "SELECT id, Sport from Sport ";
    

    db.query(sport,async (err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
        
    })

})
//voir les offre admin par sport 
app.get("/offreadminfilter/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const sport = "SELECT Offre.id,Sport,Offre,Place_offre,Prix_offre,Places_dispo,SPORT_ID from Sport JOIN Offre ON Sport.id = SPORT_ID WHERE SPORT_ID=(?)";
    

    db.query(sport,[id],async (err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
        
    })

})

//selectioner une offre à modifier 
app.get("/offreadmin/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const sport = "SELECT Offre.id,Sport,Offre,Place_offre,Prix_offre,Places_dispo,SPORT_ID from Sport JOIN Offre ON Sport.id = SPORT_ID WHERE Offre.id=(?)";
    

    db.query(sport,[id],async (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })

})
//Update une offre 

app.patch("/update/:id",(req,res)=>{
const id = parseInt(req.params.id)

const update = `UPDATE JO24.Offre SET ` ;
const updateid =` WHERE id=(?)`;
let offre =``;
let place =``;
let dispo =``;
let prix =``;

if(req.body.Offre.length >0 ){
if(req.body.Offre && req.body.Place_offre || req.body.Places_dispo || req.body.Prix_offre ){offre =` Offre=${req.body.Offre},` }else if(req.body.Offre) {offre =` Offre=${req.body.Offre}`}}

if(req.body.Place_offre.length >0){
 if(req.body.Place_offre && req.body.Places_dispo || req.body.Prix_offre){place =` Place_offre=${req.body.Place_offre},` }else if(req.body.Place_offre){place =` Place_offre=${req.body.Place_offre}` }}

 if(req.body.Prix_offre && req.body.Places_dispo){prix =` Prix_offre=${req.body.Prix_offre},` }else if(req.body.Prix_offre ){prix =` Prix_offre=${req.body.Prix_offre}`}

 if(req.body.Places_dispo){dispo =` Places_dispo=${req.body.Places_dispo}` }


console.log(req.body.Offre.length)
const update3 = update+offre + place+ prix + dispo +updateid
console.log(update3)


db.query(update3,[id],async (err,data)=>{
    console.log(data)
    if(err)return res.json(err);
    return res.json(data);
    
})
})

//delette offre

app.delete("/offreadmindelete/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const supp = "DELETE FROM JO24.Offre  WHERE id=(?) ";
    
    
    console.log(id)
    
    
    db.query(supp,[id],async (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })
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
