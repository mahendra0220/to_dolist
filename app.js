const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items=["Wake up","Breakfast"];
app.set('view engine', 'ejs');

app.get("/",function(req,res){
let today= new Date();
let option={
  weekday :"long",
  day : "numeric",
  month : "long"
};
let day=today.toLocaleString("en-US",option);

    res.render("list",{kindofday:day,newitems:items});

});



app.post("/",function(req,res){
let itm=req.body.newitem;
  items.push(itm);
  res.redirect("/");
});



app.listen(process.env.PORT||3000,function(){
  console.log("server is running on 3000 port");
});
