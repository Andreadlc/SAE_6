const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const accueilRouter = require("./routes/accueil");
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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", accueilRouter);