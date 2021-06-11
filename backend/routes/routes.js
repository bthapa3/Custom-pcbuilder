const express=require ("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const bodyparser = require('body-parser').json();
const passport = require("passport");
const db = require('../db')
const {jwtkey} = require('../keys')
const session=require("express-session");
const flash=require ("express-flash");


router.use(bodyparser);
router.use(express.urlencoded({ extended: false }));

router.use(
    session({
    secret:"secret",
    resave: false,
    saveUninitialized:false 
    })
);

// Funtion inside passport which initializes passport
router.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
router.use(passport.session());
router.use(flash());



router.post('/signup',checkAuthenticated, bodyparser,async function(req, res) {
    try{

        const text = "INSERT INTO AUTHORIZE (EMAIL,PASSWORD) VALUES ($1,$2) RETURNING * ;"
        const {email,password} = req.body;
        
        if(!email || !password ){
            return res.status(401).send("enter email and password");
        }
        if(password.length<5){
            return res.status(401).send("password values donot match");
        }
        
        db.query('SELECT * FROM AUTHORIZE WHERE email=$1',
        [email],async (err,results)=>{
            if (err){
                throw err;
            }     
            
            if(results.rows.length>0){
                console.log(results.rows);
                console.log("email already exists")
                return res.status(200).send({"result":"alreadyregistered"})
            }
            else{
                let hashedpassword= await bcrypt.hash(password,10);
                const values = [email,hashedpassword];
                const { rows } = await db.query(text,values);
                console.log("registered");
                const token = jwt.sign({email:email},jwtkey)
                res.send({token})
            }

        })     
}
    catch(err){
        console.log("Error made: "+ err)
        res.status(422).send("rows were not created")
    }
})
/*
router.post("/login",checkAuthenticated, bodyparser,
    passport.authenticate("local", {
      successRedirect: "/able",
      failureRedirect: "/unable",
      failureFlash: true
    })
);*/

router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password);
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }

    const user = await db.query(
        `SELECT * FROM authorize WHERE email = $1`,[email],
        (err, results) => {
          if (err) {
            throw err;
          }
        console.log(results.rows);
        if (email=="" || password== ""){
          return res.status(206).send({error :"must provide email or password"})
        }
        if (results.rows.length > 0) {
            const user = results.rows[0];
  
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
              }
              if (isMatch) {
                const token = jwt.sign({email:email},jwtkey);
                console.log(token);
                res.status(200).send({token});
              } else {
                //password is incorrect
                return res.status(206).send({error :"must provide email or password"})
              }
            });
          } else {
            // No user
            return res.status(206).send({error :"must provide valid email and password"})
          }
    });

})



router.get("/unable",checkNotAuthenticated, function(req,res){
    console.log("User is not authenitcated so he can view this page;");
    res.status(200).send({"login":"failure"});
});

router.get("/dashboard",checkNotAuthenticated,function(req,res){
    res.send("This is a dashboard by user");
});
router.get("/able",checkNotAuthenticated, function(req,res){
    console.log("this is req" + req.session);
    res.status(200).send({"login":"able"});
});


router.get("/logout", (req, res) => {
    req.logout();
    res.send("You have logged out successfully" );
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
}
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
   res.send("please log in")
  }


module.exports= router;