//import the express module
const express = require('express');
// Define the port number the server will listen on
const PORT = 3000;
// create an instance for  express application
// because it give us the starting  point
const app = express();
app.get("/hello",(req, res)=>{
    res.send("hello world");
});
// start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //LOG THE NUMBER
    console.log(`server is running on ${PORT}`);
})