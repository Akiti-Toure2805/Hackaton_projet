const express = require("express"); 
const { setPosts, getForm, getConnexion } = require("../controllers/post.controllers");
const router = express.Router();

//recuperer tous les articles
router.get("/" , (req, res) => {
    res.json({message: ""});
});

// route du formulaire
router.get("/form", getForm);

// route de la connexion
router.get("/connexion", getConnexion);

router.get('/:id', (req, res) => {
    res.json({messageId: req.params.id});
});

//ajouter un article
router.post("/inscription", setPosts);


module.exports = router
