const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require('./models/chat.js');
const methodOverride=require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

//   use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
// let chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send me your exam sheets",
//     created_at:new Date(),
// });
// chat1.save().then((res)=>{console.log(res)});
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});
// NEW ROUTE

app.get("/chats/new",(req,res)=>{
  
    res.render("new.ejs");
});
// CREEATE ROUTE
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
       
    });
   newChat.save().then(res=>{console.log("chat was saved")}).catch(err=>(console.log(err)));
    res.redirect("/chats");
}
);
// EDIT ROUTE
// app.get( ,(req,res)=>{
// res.render("edit.ejs")});
app.get("/chats/:id/edit", async (req, res) => {
    try {
        // Get the id from req.params
        let { id } = req.params;
        
        // Find the chat by id
        let chat = await Chat.findById(id);

        // Check if chat exists
        if (!chat) {
            return res.status(404).send("Chat not found");
        }

        // Render the edit.ejs template with the chat object
        res.render("edit.ejs", { chat });
    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).send("Internal Server Error");
    }
});
// UPDATE ROUTE
app.put("/chats/:id",async(req,res)=>
{
    let{id}=req.params;
    let {msg:newMsg}=req.body;
    console.log(newMsg);
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
})
// destroy route
app.delete("/chats/:id",async(req,res)=>
{
    let{id}=req.params;
    let deleteChat=await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})

app.listen(8080,()=>{
    console.log("server is listening on port8080");
});
