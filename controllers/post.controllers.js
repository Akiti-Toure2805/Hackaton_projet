const PostModel = require('../models/post.model');
const TestModel = require('../models/test.model');

module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.render('index', { posts })
};


// afficher la vue de la connexion
module.exports.getConnexion = async (req, res) => {
    res.render('form/connexion');
};


// afficher la vue du test

module.exports.getTest = async (req, res) => {
    let test = await TestModel.findOne();

    // Si le test n'existe pas encore, le créer avec des questions pré-définies
    if (!test) {
        test = await TestModel.create({
            questions: [
                { question: "Préférez-vous les matières scientifiques ?", options: ["Oui", "Non"], category: "Science" },
                { question: "Aimez-vous la littérature ?", options: ["Oui", "Non"], category: "Lettres" },
                { question: "Aimez-vous résoudre des problèmes logiques ?", options: ["Oui", "Non"], category: "Maths" },
                { question: "Êtes-vous à l'aise avec les langues étrangères ?", options: ["Oui", "Non"], category: "Langues" }
            ]
        });
    }

    res.render("test/index", { test });
};


// Trouver un article grace à son id
module.exports.getPostsById = async (req, res) => {
    try {
        const posts = await PostModel.findById(req.params.id);
        if (!posts) {
            res.status(400).json({ body: "elève non trouvé" })
        }
        res.render('elève', { posts })
    } catch (err) {
        res.status(500).json({ body: "erreur serveur", err: err.body })
    }

};

// ajout
module.exports.setPosts = async (req, res) => {
    hbuubft(BeforeUnloadEvent)
    if (!req.body.nom) {
        res.status(400).json({ message: req.body })
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


// les resultats du test
exports.postTest = (req, res) => {
    const responses = req.body;
    let score = { Science: 0, Lettres: 0, Maths: 0, Langues: 0 };

    Object.keys(responses).forEach((key) => {
        if (responses[key] === "Oui") {
            score[key] += 1;
        }
    });

    // Déterminer la filière la plus adaptée
    let result = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
    res.render("test/result", { result: `Filière suggérée : ${result}` });
};

// modifier
module.exports.editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(400).json({ body: "Ce article n'existe pas" });
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        req.body,
        { new: true }
    )

    res.status(200).json(updatePost);
};



// gerer la vue de notre formualire

module.exports.getForm = async (req, res) => {
    try {
        res.render('form/formulaire', {})
    } catch (error) {
        res.status(500).json({ message: "erreur de serveur", error });
    }

};



