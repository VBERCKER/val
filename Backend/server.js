import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors"; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import session from "express-session";
import passport from "passport"; 
import {passportUse} from "./midleware/passport.js"



import Stripe from 'stripe';


import 'dotenv/config'
import {sequelize } from './config/db.config.js'
import { verifyToken } from "./midleware/token.js";

import {router as user_router} from "./Routes/userRoute.js"




const stripe = new Stripe(process.env.STRIPE_KEY);

const app=express();

// conexion basse de donée *************************************
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})

// Cors ******************************
const whitelist = ['http://localhost:3000','http://localhost:5173',"http://app.forestadmin.com", "https://app.forestadmin.com" /** other domains if any */ ]
 const corsOptions = { 
    credentials: true, 
    origin: function(origin, callback) { 
        if (whitelist.indexOf(origin) !== -1) 
        { callback(null, true) 
        } else {
             callback(new Error('Not allowed by CORS et oui ')) 
            } 
        }
     } 
     
     
app.use(express.json())
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
    passportUse.authenticate("local",{ 
    successRedirect : "/autorisation",
    failureRedirect : "/nonautorisation", 
}))

// route login non autorisaté ************
app.get("/nonautorisation", (_,res)=>{

    return res.json("Email ou mots de passe incorect");
})



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

app.post("/create-checkout-session",async(req,res)=>{

const {product} = req.body;
console.log(product)

const lineItems =product.map((product)=>({
    price_data:{
        currency:"eur",
        product_data:{
            name : product.sport,
            description : "Vous avez selectionné l'offre : " + product.offre,
            images : [encodeURI(product.image)]
        },
        unit_amount : Math.round(product.prix*100),
    },
    quantity: product.quantity,
    
}));
const session = await stripe.checkout.sessions.create({
    customer_email: 'valentin.bercker@gmail.com',
    payment_method_types:["card"],
    line_items : lineItems,
    mode:"payment",
    success_url:"http://localhost:5173/compte/sucess", 
    cancel_url:"http://localhost:5173/compte/cancel", 
})
res.json({id:session.id})
})

//stripe vers la bd *******************************




const endpointSecret = process.env.STRIPE_ENDPOINTSECRET;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log("ok")      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


/*******Satrt Serveur  */

sequelize.authenticate()
    .then(()=>console.log('connection à la base de donnée ok '))
    .then(()=>{
        app.listen(process.env.SERVER_PORT,()=>{console.log(`Le serveur fonctionne sur le port ${process.env.SERVER_PORT}`)});
    })
    .catch(err=>console.log('erreur sur la base de donnée', err))
// express 

