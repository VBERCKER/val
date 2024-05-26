
import passport from "passport"; 
import {Strategy} from "passport-local"; 
import mysql from "mysql2";
import bcrypt from 'bcrypt'; 
import GoogleStrategy from "passport-google-oauth2";
import 'dotenv/config'


// conexion basse de donée *************************************
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})





// midleware passport 
 export const passportUse = passport.use("local",new Strategy(async function verify(username,password,cb){ // doit matcher avec lo from 
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
                                
                              return cb(null, user );   //va permettre d'accceer aux info uti avce req.user plus tard
    
    
                            } else{
                                return cb(null, false);
                            }
                        }
                });
                }else{return cb("Utilisateur non trouvé")
    
            }})
        
            }catch(err){return cb(err);}
    }));
    

export const passportG = passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/autorisation",
    userProfileURL : "https://www.googleapi.com/oauth2/v3/userinfo",
}, async (acessToken, refreshToken,profile,cb)=>{
    
   console.log(profile)

   const result ="SELECT * FROM utilisateur WHERE mail =(?)";
   const email =[profile.mail,];

   try {
       
       db.query(result,[email],async (err,data)=>{
   
       if (result.length === 0) {

         const newUser ="INSERT INTO utilisateur (nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur,role) VALUES (?)";
          const user =  [
           profile.family_name,
           given_name,
           profile.family_name +'.'+given_name,
           profile.email,
            "google",
           profile.id,
           "user"
       
       ]

           db.query(newUser,[user], (err,data)=>{
               if(err)return res.json(err);
               return res.json("ok");}
         )

          cb(null, newUser[0]);
       } else {
         cb(null, result[0]);
       }})
     } catch (err) {
       cb(err);
     }
}))


// passport 

passport.serializeUser((user, cb)=>{  //stocker les donne utilisateur en local 
    cb(null,user); 
    
    });
    
    passport.deserializeUser((user, cb)=>{  //a veerif les donnees utilisateur en local 
        cb(null,user); 
        
        });
    
