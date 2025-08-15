//import the express module
const express = require('express');
const mongoose  = require('mongoose');

// Define the port number the server will listen on
const PORT = 3000;
// create an instance for  express application
// because it give us the starting  point
const app = express();
// mangodb string
const DB = "mongodb+srv://sreenivasreddicherla:Sreenivas@cluster0.3bpnjsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// app.get("/hello",(req, res)=>{
//     res.send("hello world");
// });
//middleware to register routes or to mount routes

mongoose.connect(DB).then(()=>{
    console.log('mongodb connected');
});
// start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //LOG THE NUMBER
    console.log(`server is running on ${PORT}`);
});