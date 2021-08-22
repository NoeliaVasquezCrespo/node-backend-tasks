//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

///Crear una tarea
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    tasks.push(req.body);
    res.send("OK");
});

/// Obtener lista de tareas
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

/// Obtener lista de una tarea
app.get("/tasks/:taskId", function(req, res) {
    var task = tasks.find(task => task.id == req.params.taskId);
    res.json(task);
    
});

/// Editar una tarea
app.put("/tasks/:taskId", jsonParser, function(req, res) {
    var task = tasks.find(task => task.id == req.params.taskId);

    task.title = req.body.title;
    task.detail = req.body.detail;
    res.json(task);
    
});


///Eliminar una tarea
app.delete("/tasks/:taskId",jsonParser, function(req, res) {
    var index = tasks.findIndex(task => task.id == req.params.taskId);

    console.log("Index "+index);

    tasks.splice(index,req.params.taskId);
    res.sendStatus(200);

});

/// Estado Completado 
app.put('/tasks/:taskId', jsonParser, function(req, res) {

    const status = req.query.status; 
    if (status=="COMPLETED") {
        res.send("PUT invoked with path variable: " + req.params.taskId +
             ", query variable status: " + status + " and body: " + req.body);
    } else {
        res.send("PUT invoked with path variable: " + req.params.taskId + " and body: " + req.body);
    }
});

///Estado Pendiente
app.put('/tasks/:taskId', jsonParser, function(req, res) {

    const status = req.query.status; 
    if (status=="PENDING") {
        res.send("PUT invoked with path variable: " + req.params.taskId +
             ", query variable status: " + status + " and body: " + req.body);
    } else {
        res.send("PUT invoked with path variable: " + req.params.taskId + " and body: " + req.body);
    }
});


/// Servidor
app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});