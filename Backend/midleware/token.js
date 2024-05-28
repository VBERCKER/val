import jwt from 'jsonwebtoken';
import mysql from "mysql2";
import env from "dotenv"
env.config();

// conexion basse de donée *************************************
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})
//mildeleware JWT ********************************************
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}
/*** Vérification de la présence du token */
export const verifyToken = (req, res, next) => {
    
    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    let decodedToken = jwt.decode(token)
    const sql = "SELECT mail FROM utilisateur WHERE token =(?)"
    
    // verifier la validité du JWT 

    jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{

      if(err){
        return res.status(401).json({ message: 'Mauvais Token !' + err})
      }  
      if(!token ){
        return res.status(401).json({ message: 'Ho le petit malin !!!'})
    }else
    if(token){
        db.query(sql,[token], (err,data)=>{
            
            if(data[0] === undefined){return res.status(401).json({ message: 'Hohoho le petit malin !!!'})}else
            if(data[0].mail !== decodedToken.mail){ return res.status(401).json({ message: 'Hoho le petit malin !!!'})}else
            if(data[0].mail === decodedToken.mail){
                req.user = decodedToken   
            }
            next()
        }) 
    }
    })
   
}
//******************************************** */
