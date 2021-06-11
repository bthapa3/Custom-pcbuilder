const express=require("express")
const app=express();
const bodyparser = require('body-parser').json();
const db = require('./db')
const passport = require("passport");
const routes=require('./routes/routes');
const PORT= process.env.PORT || 3000; //process.env.PORT will be needed for production mode.
const session=require("express-session");
const requireToken = require('./requireToken')
const flash=require ("express-flash");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(routes);
app.use(bodyparser);
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
    secret:"secret",
    resave: false,
    saveUninitialized:false 
    })
);

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

/*
app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/able",
      failureRedirect: "/unable",
      failureFlash: true
    })
);
*/

app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email})
})

app.get("/unable",function(req,res){
    res.send("Failed to login");
});

app.get("/able",function(req,res){
    res.send("logged in");
});


app.listen(PORT, function(){
    console.log("server is running at: "+ PORT);
});