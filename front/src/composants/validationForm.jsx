import * as yup from 'yup';



export const  userprenom = yup.object().shape({
    prenom : yup.string().required(),
    
   
})

export const  usernom = yup.object().shape({
    nom: yup.string().required().min(2),
   
})

export const  usermail = yup.object().shape({
   
    mail: yup.string().email().required(),
   
   
})
export const  userpwd = yup.object().shape({
   
    pwd: yup.string().min(7),
   
   
});



