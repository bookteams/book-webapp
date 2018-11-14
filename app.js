const express = require("express");
const fs = require("fs");
const app = express();
app.set("view engine","ejs");
app.use("/css",express.static("css"));
app.use("/js", express.static("js"));
app.use("/image", express.static("image"));
//路由
const route = require("./route/route");

route(app); 

app.listen(8080,"127.0.0.1",function(){
    console.log("running server 127.0.0.1:8080");
});
