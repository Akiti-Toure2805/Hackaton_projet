const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 7001;
const app = express();

connectDB();
// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Si tu acceptes aussi des données de type `application/x-www-form-urlencoded`
app.use(express.urlencoded({ extended: true }));

// Spécifier le dossier pour les fichiers statiques
app.use(express.static('publics'));



// La gestion des routes de requêtes
app.use("/", require("./routes/post.route"));

app.set('view engine', 'ejs'); 
// Route de la page d'accueil
app.get('/', (req, res) => {
    res.status(200).render("index"); 
});



app.listen(port, () => console.log("Le serveur a démarré au " + port));
