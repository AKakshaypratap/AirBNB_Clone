const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// app.use(cookieParser("secretcode"));
app.use(session({
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true
}));

app.use(flash());

// app.get("/getsignedcookie", (req,res) => {
//     res.cookie("name", "akshay", {signed: true});
//     res.send("done");
// })

// app.get("/verify", (req,res) => {
//     console.log(req.cookies);
//     res.send("verified");
// })

// app.get("/greet", (req,res) => {
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// })

// app.get("/", (req,res) => {
//     console.dir(req.cookies);
//     res.send("Hii, I am root");
// });

// // app.get("/getcookies",(req,res) => {
// //     res.cookie("greet","hello");
// //     res.cookie("madeIn","India");
// //     res.send("successfully sent some cookies");
// // })

// app.use("/users", users);
// app.use("/posts", posts);



app.get("/test",(req,res) => {
    res.send("test successful");
})

app.get("/reqcount",(req,res) =>{
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count = 1;
    }
    res.send(`you send request ${req.session.count} times`);
})

app.get("/register",(req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success","user registered successfully");
    res.redirect("/hello");
})

app.get("/hello",(req,res) => {
    // res.send(`hello, ${req.session.naem}`);
     res.render("page.ejs",{name: req.session.name, msg: req.flash("success")});
})

app.listen(3000, () =>{
    console.log("server is listening to the port 3000");
});