const jwt = require('jsonwebtoken');
const {jwtkey} = require('./keys')
const pool = require("./db");

module.exports = (req,res,next)=>{
       const { authorization } = req.headers;
       
       //authorization === Bearer sfafsafa
       if(!authorization){
           return res.status(401).send({error:"you must be logged in"})
       }
       const token = authorization.replace("Bearer ","");
       console.log("token" + token)
       jwt.verify(token,jwtkey,async (err,payload)=>{
           if(err){
             return  res.status(401).send({error:"you must be logged in 2"})
           }
        const {email} = payload;
        console.log("email is"+ email);
        console.log("payload is"+ payload);

        user= pool.query(
            `SELECT * FROM authorize WHERE email = $1`,[email],
            (err, results) => {
                if (err) {
                throw err;
                }
            console.log(results.rows);
            if (results.rows.length > 0) {
                const user = results.rows[0];
                req.user=user;
                next();
               
            } else {
                // No user
                return res.status(206).send({error :"Error! code b23"})
            }
        });
        


            
        
       })
}