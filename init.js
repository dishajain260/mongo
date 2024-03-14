const mongoose=require("mongoose");
const Chat=require('./models/chat.js')
main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
let allChats=[
    {
        from:"neha",
        to: "preeti",
        msg:"send me the notes for the exam",
        created_at:Date(),
    },
    {
        from:"rohit",
        to: "mohit",
        msg:"teach me something",
        created_at:Date(),
    },
    {
        from:"amit",
        to: "sumit",
        msg:"how are you",
        created_at:Date(),
    },
    {
        from:"tony",
        to: "peter",
        msg:"are you fine?",
        created_at:Date(),
    }

]
Chat.insertMany(allChats);
let chat1=new Chat({
    from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at:new Date(),
});
chat1.save().then((res)=>{console.log(res)});

