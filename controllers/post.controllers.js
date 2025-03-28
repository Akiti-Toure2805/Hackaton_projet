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


// afficher la vue de la confirmation
module.exports.getConfirmation = async (req, res) => {
    const { nom, prenom, email, serie, contact } = req.body;

    // Ici, tu peux sauvegarder les données dans la base de données si nécessaire

    // Rendre une page avec un message de confirmation
    res.render("confirmation", { nom });
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
// module.exports.setPosts = async (req, res) => {
//     try {
//         // Vérification des champs obligatoires
//         const { nom, prenom, mail, contact, serie } = req.body;
//         if (!nom || !prenom || !mail || !contact || !serie) {
//             return res.status(400).json({ message: "Tous les champs sont requis" });
//         }

//         // Création du post
//         const post = await PostModel.create({
//             nom,
//             prenom,
//             mail,
//             contact,
//             serie,
//             createdAt: new Date()
//         });

//         // res.status(201).json(post); // 201 = Création réussie
//         res.render("confirmation", { message: `Merci ${prenom} ${nom} ! Votre inscription est réussie.` });

//     } catch (error) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// };

module.exports.setPosts = async (req, res) => {
    console.log("Données reçues :", req.body); // <-- Ajoute ceci

    try {
        const { nom, prenom, email, contact, serie } = req.body;

        // Vérification des champs obligatoires
        if (!nom || !prenom || !email || !contact || !serie) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        // Création du post
        const post = await PostModel.create({
            nom,
            prenom,
            email,
            contact,
            serie,
            createdAt: new Date()
        });

        res.status(200).json(post);

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
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



