//jshint esversion:6


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://Localhost:27017/todolistDB");
const itemSchema={
  name :String
};
const Item=mongoose.model("item",itemSchema);


const item1=new Item({
  name:"Welcome To Your To_do List!!"
});
const item2=new Item({
  name:"Hit + Botton To Add New Item"
});
const item3=new Item({
  name:"<-- Hit This To Delete An Item"
});
const defaultitems=[item1,item2,item3];


app.get("/", function(req, res) {
  Item.find({},function(err,founditems)
  {
    if(founditems.length===0)
    {
      Item.insertMany(defaultitems,function(err)
      {
      if(err)
       console.log(err);
      else
        console.log("succesfully saved datail");
      });
      res.redirect("/");
    }
    else
    res.render("list", {listTitle: "Today", newListItems: founditems});
  });


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item_1=new Item({
    name :itemName
  });

item_1.save();
res.redirect("/");
});

app.post("/delete", function(req, res){

const checkeditem=req.body.checkbox;
Item.findByIdAndRemove(checkeditem,function(err){
  if(err)
   console.log(err);
   else
    console.log("succesfully deleted checked item");
});
res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
