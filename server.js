const express = require("express")
const products = require("./routes/products")
const mongoose = require("mongoose")

const url = "mongodb+srv://diegostriveschool:h6nxg5U9SDcsLA26@cluster0-3ar0p.azure.mongodb.net/test?retryWrites=true&w=majority"
const connection = mongoose.connect(url, { useNewUrlParser: true})
connection.then(db=>{
    console.log("Database up & running")
},
err =>{
    console.log(err)
})

var server = express();
server.set("port", process.env.PORT || 3005);
server.use(express.json())

server.get("/", (req, res)=>{
    res.send("Helloooo")
})

server.use("/products", products)



server.listen(server.get("port"), () => {
     console.log("SERVER IS RUNNING ON " + server.get("port"));
   })