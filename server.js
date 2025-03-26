const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const port = 7001;
const app = express();
const path = require('path');

connectDB();


app.set('view engine', 'ejs'); 

// Spécifier le dossier 'views' pour Express
app.set('views', path.join(__dirname, 'views'));


// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Si tu acceptes aussi des données de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Spécifier le dossier pour les fichiers statiques
app.use(express.static('publics'));

// Route de la page d'accueil
app.get('/', (req, res) => {
    res.status(200).render("index"); 
});


// Route pour afficher la page de connexion
app.get('/connexion', (req, res) => {
    res.render('form/connexion'); 
});


// Route pour afficher le formulaire d'inscription
app.get('/formulaire', (req, res) => {
    res.render('form/formulaire'); 
});


// Route pour gérer la soumission du formulaire
app.post('/inscription', (req, res) => {
    const { nom, prenom, email, Serie, contact } = req.body;

    // Après que l'utilisateur ait soumis le formulaire, on le redirige vers une nouvelle page de confirmation
    res.render('confirmation', {
        message: `Merci ${prenom} ${nom} ! Votre inscription est terminée. Vous pouvez maintenant passer le test psychométrique.`
    });
});


// Route pour afficher la page de confirmation
app.get('/confirmation', (req, res) => {
    res.render('confirmation', {
        message: req.query.message || 'Vous avez bien été inscrit !'
    });
});


// La gestion des routes de requêtes
app.use("/post", require("./routes/post.route"));


app.listen(port, () => console.log("Le serveur a démarré au " + port));