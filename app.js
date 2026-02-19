const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const accueilRouter = require("./routes/accueil");
const authRouter = require("./routes/auth");
const justeprixRouter = require("./routes/justeprix");
const moduleRouter = require("./routes/calcul");
const error404 = require("./controllers/error404Controler");
const mongoose = require("mongoose");

// On se connecte à une base nommée "sae6_db" (elle se créera toute seule)
mongoose.connect('mongodb://127.0.0.1:27017/sae6_db')
    .then(() => console.log("Connecté à MongoDB avec succès !"))
    .catch(err => console.log("Erreur de connexion MongoDB :", err));

const session = require("express-session");


app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.set("view engine", "ejs");
app.set("views", "views");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRouter);
app.use(justeprixRouter);
app.use(moduleRouter);
app.use("/", accueilRouter);

app.use(error404.get404);