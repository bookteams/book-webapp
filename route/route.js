const fs = require("fs");
const data = require("../module/data");
function route(app) {
    app.get("/", (req, res) => {
        res.render("index", {
            data: data,
        });
    });
    app.get("/login", (req, res) => {
        res.render("login")        
    })
    app.get("/index/:id", (req, res) => {
         res.render("index", {
             data: data,
         })
    })
    app.get("/literature", (req, res) => {
        res.render("context");
    });
    app.get("/children", (req, res) => {
        res.render("context");
    });
    app.get("/humanity", (req, res) => {
        res.render("context");
    });
    app.get("/science", (req, res) => {
        res.render("context");
    });
    app.get("/economic", (req, res) => {
        res.render("context");
    });
    app.get("/life", (req, res) => {
        res.render("context");
    });
    //路由参数
    app.get("/literature/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/children/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/humanity/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/science/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/economic/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/life/:id", (req, res) => {
        console.log(req.params.id);
        res.render("context");
    });
    app.get("/commodity/:id", (req, res) => {
        res.render("commodity");
    })
}
module.exports = route;