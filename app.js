const express = require('express');
const app = express();
const port = 8000;

// Burocracia para usar sesiones
const session = require('express-session');
app.use(session({ secret: 'SuperClave' }));

// Establecer directorio views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Establecer directorio public
app.use(express.static('public'));


// Rutas

app.get("/", (req, res) => {
    if (req.session.count == undefined) {
        req.session.count = 0;
    }
    req.session.count += 1;
    res.render("count", { counter: req.session.count });
});

app.get("/sumar", (req, res) => {
    req.session.count = req.session.count += 1;
    res.redirect("/")
});

app.get("/reset", (req, res) => {
    req.session.count = 0;
    res.redirect("/")
});     

// Iniciamos el servidor
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));