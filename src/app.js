const express= require("express");
const app= express();
const path= require("path");
require("./db/conn");

const user = require("./db/models/usermessage.js");

const hbs= require("hbs");
const port= process.env.PORT || 3000;

// set the path

const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");


//middelware
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));


app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine","hbs");

app.set("views",templatepath);
hbs.registerPartials(partialpath);
//routing
app.get("/",(req,res)=>{

res.render("index")

})

app.get("/contact",(req,res)=>{

    res.render("contact")
    
    })



app.post("/contact",async(req,res)=>{
try {
    //res.send(req.body)
    const userdata= new user(req.body)
await userdata.save();
res.status(201).render("index")

    
} catch (error) {
    res.status(500).send(error) 
}


})




app.listen(port,()=>{

console.log(`server is running no ${port}`);


});