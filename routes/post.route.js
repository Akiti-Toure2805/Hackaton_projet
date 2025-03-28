const express = require("express"); 
const { setPosts, getForm, getConnexion, getTest, postTest, getConfirmation } = require("../controllers/post.controllers");
const router = express.Router();

//recuperer tous les articles
router.get("/" , (req, res) => {
    res.json({message: ""});
});

// route du formulaire
router.get("/form", getForm);

// route du test
router.get("/test", getTest);

// route de la connexion
router.get("/connexion", getConnexion);


// par id
router.get('/:id', (req, res) => {
    res.json({messageId: req.params.id});
});

// ajouter un article
router.post("/inscription", setPosts);

// ajouter de questions
router.post("/submit", postTest);


module.exports = router
