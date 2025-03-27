const PostModel = require('../models/post.model');

module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.render('index',{posts})
}; 

// afficher ma vue du formulaire
// module.exports.getForm = async (req, res) => {
//     res.render('form/formulaire');
// };

// afficher la vue de la connexion
module.exports.getConnexion = async (req, res) => { 
    res.render('form/connexion');
};



// Trouver un article grace à son id
module.exports.getPostsById = async (req, res) => {
    try {
        const posts = await PostModel.findById(req.params.id);
        if (!posts) {
            res.status(400).json({body: "elève non trouvé"})
        }
        res.render('elève', {posts})
    } catch (err){
        res.status(500).json({body: "erreur serveur", err: err.body})
    }

};

module.exports.setPosts = async (req, res) => {

    if (!req.body.nom) {
        res.status(400).json({nm: req.body})
    } 
    const post = await PostModel.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        contact: req.body.contact,
        serie: req.body.serie,
        createdAt: new Date
    });
    res.status(200).json(post);

};


module.exports.editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(400).json({ body: "Ce article n'existe pas" });
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        req.body,
        {new: true}
    )

    res.status(200).json(updatePost);
};



// gerer la vue de notre formualire

module.exports.getForm = async(req, res) => {
    try{
        res.render('form/formulaire', {})
    } catch (error) {
        res.status(500).json({ message: "erreur de serveur", error });
    }
    
}