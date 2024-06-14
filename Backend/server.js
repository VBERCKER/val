import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors"; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import session from "express-session";
import passport from "passport"; 
import {passportUse,passportG} from "./midleware/passport.js"




import Stripe from 'stripe';


import 'dotenv/config'
import {sequelize } from './config/db.config.js'
import { verifyToken } from "./midleware/token.js";


import {router as user_router} from "./Routes/userRoute.js"




const stripe = new Stripe(process.env.STRIPE_KEY);

const app=express();

// conexion basse de donée *************************************
const db = mysql.createConnection({
    host:  process.env.DB_HOST,
    user : process.env.DB_USER, 
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})

// Cors ******************************
const whitelist = ['http://localhost:3000','http://localhost:5173',"https://accounts.google.com","https://checkout.stripe.com/","https://dashboard.stripe.com/test/events/evt_3PRXSwP2tu9ynZbp0JJeBBGs" /** other domains if any */ ]
 const corsOptions = { 
    credentials: true, 
    origin: function(origin, callback) { 
        if (whitelist.indexOf(origin) !== -1 ||!origin) 
        { callback(null, true) 
        } else {
             callback(new Error('Not allowed by CORS et oui ')) 
             
            } 
        } 
     } 

    
   
 //app.use(express.urlencoded({limit:'30mb'}))    /// non non 
app.use(express.json())
app.use(bodyParser.json({verify:function(req,res,buf){req.rowBody =buf}}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors(corsOptions))


//session ********************************************
app.use(session({
    secret : process.env.COKIES_SECRET,   
    resave: false, 
    saveUninitialized : true, 
    cookie:{ secure : false,
        maxAge : 1000 * 60 * 60 * 24,    
    }

}))

app.use(passport.initialize());
app.use(passport.session());

//******************************* */

app.get("/",(req,res)=>{
    res.json("Hello World")
})


/// autorisation d'accès pages protéges *********************************************
app.get('/autorisation', (req,res)=>{ 
    
    if(req.isAuthenticated()){

        const token = jwt.sign({
            id : req.user.id,
            mail : req.user.mail
        }, process.env.JWT_SECRET,{expiresIn: process.env.JWT_DURING}
        )
            res.json([{name:'Autorisation'},{user : req.user},{access_token: token}])
        
      
    }else {
        res.json('NON')
        
    }

    
})

// test de connexion back *************************
app.use("/test", user_router)




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

// ajout utilisateur ***********************************************
app.post("/add", async(req,res)=>{
    function genererCle(longueur) {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var cle = '';
        for (var i = 0; i < longueur; i++) {
            cle += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return cle;
    }
    const cles = genererCle(10)
    const pwd = req.body.pwd; 
    const passHash = await bcrypt.hash(pwd,10)
    const admin = "false"

    const add= "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur,admin) VALUES(?) ";
    const values=[
        req.body.nom,
        req.body.prenom,
        req.body.nom +"."+req.body.prenom,
        req.body.mail,
        passHash,
        cles,
        admin

    ];
   
    db.query(add,[values], (err,data)=>{
        if(err)return res.json(err);
        return res.json("vous etes enregistré");
    })
})

//******* modifier mots de passe */

app.patch("/pwd/:id",async (req,res)=>{

 const id  = parseInt(req.params.id) ; 
 const pwd = req.body.pwd; 
 console.log(pwd)
 const passHash = await bcrypt.hash(pwd,10)

const update = `UPDATE JO24.utilisateur SET pwd=${passHash} WHERE id=(?)`

db.query(update,[id],async (err,_)=>{
    
    if(err)return res.json(err);
    return res.json('ok');
    
})
})


// ajout offres ***************************************************
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
/*****Login ***************************************** */

//login par token 

app.post('/token',verifyToken,async(req,res)=>{
    if(req.user){
        res.json('ok')
    }
    else res.json('non o')
})


//login identfiant

app.post("/connexion",
    passport.authenticate("local",{ 
    successRedirect : "/autorisation",
    failureRedirect : "/nonautorisation", 
}))



// route login non autorisaté ************
app.get("/nonautorisation", (_,res)=>{

    return res.json("Email ou mots de passe incorect");
})

/**connexion Google  */

app.get("/auth/google", passport.authenticate("google",{
    scope:["profile", "email"],
}))

app.get("/auth/google/autorisation",
    passport.authenticate("google",{ 
    successRedirect : "/autorisation",
    failureRedirect : "/nonautorisation", 
}))


/*************Pages offres billeteries *********************** */
// voir les offres / sports pages offres/billeteries **********************************

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

/*********Pages administrateur */

//voir les offre admin  sport ******************************
app.get("/offreadminall",(req,res)=>{
    
    const sport = "SELECT id, Sport from Sport ";
    

    db.query(sport,async (err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
        
    })

})

//voir les offre admin par sport ****************************
app.get("/offreadminfilter/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const sport = "SELECT Offre.id,Sport,Offre,Place_offre,Prix_offre,Places_dispo,SPORT_ID from Sport JOIN Offre ON Sport.id = SPORT_ID WHERE SPORT_ID=(?)";
    

    db.query(sport,[id],async (err,data)=>{
        if(err)return res.json(err);
        return res.json(data);
        
    })

})

//selectioner une offre à modifier *************************
app.get("/offreadmin/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const sport = "SELECT Offre.id,Sport,Offre,Place_offre,Prix_offre,Places_dispo,SPORT_ID from Sport JOIN Offre ON Sport.id = SPORT_ID WHERE Offre.id=(?)";
    

    db.query(sport,[id],async (err,data)=>{
        console.log(data)
        if(err)return res.json(err);
        return res.json(data);
        
    })

})

//Update une offre ******************************************

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

//delette offre *******************************************************

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





/**STRIPE *************************** */

// payement modetest

app.post("/create-checkout-session/:id",async(req,res)=>{

    const id =parseInt(req.params.id)
   

    const userSQL = "SELECT id,nom,prenom,mail FROM utilisateur WHERE id=(?)";

    db.query(userSQL,[id],async (err,data)=>{

        const user = data[0];
       
     const {product} = req.body;


     const customer = await stripe.customers.create({
        metadata: {
          useerId : user.id,
          mail : user.mail
          
          
        },
      });
      
      console.log(user.mail)

const lineItems =product.map((product)=>({

    price_data:{
        currency:"eur",
        
       
        product_data:{
            
            name : product.offre +" "+":"+" "+product.sport,
            description : "Vous avez selectionné l'offre : " + product.offre,
            images : [encodeURI(product.image)],
           
        },
        unit_amount : Math.round(product.prix*100),
    },
    quantity: product.quantity,
    
}));
const session = await stripe.checkout.sessions.create({
    customer_email: user.mail,
    //customer : customer.id,
    payment_method_types:["card"],
    line_items : lineItems,
    mode:"payment",
    success_url:"http://localhost:5173/compte/sucess?session_id={CHECKOUT_SESSION_ID}", 
    cancel_url:"http://localhost:5173/compte/cancel", 
})


res.json({id:session.id})




    })





})


  

  
//stripe vers la bd *******************************
const endpointSecret = "whsec_7952173a58af1838269545d0fe863256e673ace51c15014d1b4fa42a87b21e7c";



app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
    const event = request.body;
  
    switch (event.type) {
        case 'checkout.session.completed':
            const session= event.data.object;

            stripe.checkout.sessions.listLineItems(session.id,(err,lineItems)=>{

                function genererCle(longueur) {
                    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var cle = '';
                    for (var i = 0; i < longueur; i++) {
                        cle += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                    }
                    return cle;
                }

                
                if(err){console.log("erreur de recup")}else{
                    
                    lineItems.data.forEach(async (item)=>{
                        const productDescription = item.description;
                        const cles_achat = genererCle(10)
                        const quantity= item.quantity
                        const product = productDescription.split(":")
                        const offre = product[0]
                        const sport = product[1]
                        const email = session.customer_email
                        var now = new Date();
                        var annee   = now.getFullYear();
                        var mois    = now.getMonth() + 1;
                        var jour    = now.getDate();
                        var heure   = now.getHours();
                        var minute  = now.getMinutes();
                        var seconde = now.getSeconds();

                        var date = `${jour}/${mois}/${annee}`;
                        var heureNow= `${heure}:${minute}:${seconde}`;


                        const cles_utilisateur = "SELECT cles_utilisateur,nom,prenom FROM utilisateur WHERE mail=(?)"

                        db.query(cles_utilisateur,[email],async (err,data)=>{

                            if(err){console.log(err)}else{ 

                                        const cles_QR = jwt.sign({
                                            nom : data.nom,
                                            prenom : data.prenom,
                                            cles_achat: cles_achat,
                                            cles_utilisateur : data.cles_utilisateur
                                        }, process.env.JWT_SECRET
                                    )


                        for(var i=0; i< quantity; i++){

                            const productData=[
                                 email,
                                 offre,
                                 sport,
                                 cles_achat,
                                 heureNow,
                                date,
                                cles_QR,
                                quantity
                                ]
                            
                            /**** */

                                /*** */

                            const sql = "INSERT INTO achat(user_mail,offre,sport,cles_achat,heure_achat,date,cles_QR,quantity) VALUES (?) "
                        
                            db.query(sql,[productData],async (err,data)=>{
                                
                                if(err){console.log(err)}else{console.log("✅ ticket enregistré !")}
                            })
                            

                        }}
                        
                       

                    })
                }
            )}})
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    
    
    // Return a 200 response to acknowledge receipt of the event
    response.json({received: true});
  });



/***** ebilet */

/***recupérer les information ebillets */
app.get("/ebillet/:id",(req,res)=>{
    const id = parseInt(req.params.id)


    const user = "SELECT * FROM utilisateur WHERE id = (?)"

    const tickets = "SELECT * FROM achat WHERE user_mail=(?)"
    db.query(user,[id],async (err,data)=>{
        console.log(data)
        if(err){return res.json(err)}else{

            db.query(tickets,[data[0].mail],async (err,billets)=>{

                if(err){return res.json(err)}else{
                    console.log(billets)
                    return res.json(billets);  
                    
                }
                

            })
        };
        
    })
    })









/*******Satrt Serveur  */


        app.listen(3000 ,()=>{console.log(`Le serveur fonctionne sur le port ${3000}`)});
  
// express 

