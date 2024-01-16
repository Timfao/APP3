// Récupérez l'élément du panier par son ID
var cartItemElement = document.getElementById('cartItem');

// Initialisation du panier (s'il n'existe pas déjà)
var panier = chargerPanier();

// Fonction pour mettre à jour le total
function mettreAJourTotal() {
    var total = 0;

    panier.forEach(function (produit) {
        total += produit.prix;
    });

    var totalElement = document.getElementById('total');
    totalElement.innerText = total + ' FCFA';
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nomProduit, prixProduit) {
    var produit = {
        nom: nomProduit,
        prix: prixProduit
    };

    // Ajoutez le produit au panier
    panier.push(produit);

    // Mise à jour du panier dans le stockage local
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettez à jour l'affichage du panier
    mettreAJourAffichagePanier(panier);

    // Affichez un message dans la console pour vérifier que la fonction est appelée
    console.log('Produit ajouté au panier:', produit);
}


// Fonction pour mettre à jour l'affichage du panier
function mettreAJourAffichagePanier(panier) {
    var totalElement = document.getElementById('total');
    var cartItemElement = document.getElementById('cartItem');

    if (panier.length === 0) {
        cartItemElement.innerHTML = 'Votre panier est vide';
        totalElement.innerText = '0 FCFA';
    } else {
        var html = '<ul>';
        var total = 0;

        panier.forEach(function (produit) {
            html += `
                <li>
                    ${produit.nom} - ${produit.prix} FCFA
                    <a href="#" class="removeLink" onclick="retirerDuPanier('${produit.nom}')" style="color:red;">Retirer</a>
                </li>
            `;
            total += produit.prix;
        });

        html += '</ul>';
        cartItemElement.innerHTML = html;
        totalElement.innerText = total + ' FCFA';
    }
}

// Fonction pour mettre à jour le total et le lieu de livraison
function mettreAJourTotalEtLivraison() {
    var total = 0;
    var lieuLivraison = 'DALOA'; // Valeur par défaut, vous pouvez changer cela en fonction de votre logique

    panier.forEach(function (produit) {
        total += produit.prix;
    });

    var totalElement = document.getElementById('total');
    var lieuLivraisonElement = document.getElementById('lieuLivraison');

    totalElement.innerText = 'Sous total : ' + total + ' FCFA';
    lieuLivraisonElement.innerText = 'LIVRAISON : ' + lieuLivraison;
}

// Dans votre fonction pour ajouter un produit au panier
function ajouterAuPanier(nomProduit, prixProduit) {
    var produit = {
        nom: nomProduit,
        prix: prixProduit
    };

    // Ajoutez le produit au panier
    panier.push(produit);

    // Mise à jour du panier dans le stockage local
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettez à jour l'affichage du panier
    mettreAJourAffichagePanier(panier);

    // Mettez à jour le total et le lieu de livraison
    mettreAJourTotalEtLivraison();

    // Affichez un message dans la console pour vérifier que la fonction est appelée
    console.log('Produit ajouté au panier:', produit);
}

// Dans votre fonction pour retirer un produit du panier
function retirerDuPanier(nomProduit) {
    // Recherchez l'index du produit dans le panier
    var index = -1;
    for (var i = 0; i < panier.length; i++) {
        if (panier[i].nom === nomProduit) {
            index = i;
            break;
        }
    }

    // Si le produit est trouvé, retirez-le du panier
    if (index !== -1) {
        panier.splice(index, 1);

        // Mise à jour du panier dans le stockage local
        localStorage.setItem('panier', JSON.stringify(panier));

        // Mettez à jour l'affichage du panier
        mettreAJourAffichagePanier(panier);

        // Mettez à jour le total et le lieu de livraison
        mettreAJourTotalEtLivraison();
    }
}

// Vous devrez également appeler cette fonction lors du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    panier = chargerPanier();
    mettreAJourAffichagePanier(panier);
    mettreAJourTotalEtLivraison(); // Ajoutez cette ligne pour mettre à jour le total et le lieu de livraison au chargement de la page
});

// Fonction pour vider le panier
function viderPanier() {
    panier = [];
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettez à jour l'affichage du panier
    mettreAJourAffichagePanier(panier);
}

// Mettez à jour l'affichage du panier lors du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    panier = chargerPanier();
    mettreAJourAffichagePanier(panier);
});

// Fonction pour retirer un produit du panier
function retirerDuPanier(nomProduit) {
    // Recherchez l'index du produit dans le panier
    var index = -1;
    for (var i = 0; i < panier.length; i++) {
        if (panier[i].nom === nomProduit) {
            index = i;
            break;
        }
    }

    // Si le produit est trouvé, retirez-le du panier
    if (index !== -1) {
        panier.splice(index, 1);

        // Mise à jour du panier dans le stockage local
        localStorage.setItem('panier', JSON.stringify(panier));

        // Mettez à jour l'affichage du panier
        mettreAJourAffichagePanier(panier);
    }
}

// Fonction pour charger le panier depuis le stockage local
function chargerPanier() {
    var panier = localStorage.getItem('panier');
    if (!panier) {
        panier = [];
    } else {
        panier = JSON.parse(panier);
    }
    return panier;
}

// Créez une fonction pour générer le contenu de voirplus.html
function genererContenuVoirPlus() {
    return `
        <div class="container">
            <div class="image"></div>
            <div class="descrip">
                <h1>MAYA</h1>
                <h3> PRIX :15000 fr le sac </h3>
                <p>Le riz OKFA est une variété de riz ivoirien cultivée dans la 
                    région de Daloa, en Côte d’Ivoire. Il est produit par la
                    mini-rizerie CAPI, l’un des quatre champions d’affaires de
                    notre partenariat syndiqué de riz en Côte d’Ivoire
                </p>
                <h4>Quantité </h4>
                <input type="number" id="number"><br><br>
                <label for="lieu"> lieu de livraison </label>
                <input type="text"><br><br>
                <button id="button" onclick="ajouterAuPanier('Maya', 15000)">Ajouter au panier</button>
            </div>
        </div>
    `;
}

// Utilisez la fonction pour générer le contenu et l'ajouter à payer.html
document.getElementById('voirPlusContainer').innerHTML = genererContenuVoirPlus();
document.getElementById('cartItem').innerHTML = genererContenuVoirPlus();
