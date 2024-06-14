import jwt from 'jsonwebtoken';


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

    if(!token){
        return res.status(401).json({ message: 'Ho le petit malin !!!'})
    }
    if(token){
        req.user = decodedToken
        
        next()
    }

}
//******************************************** */
