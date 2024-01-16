<?php
// Fonction pour nettoyer les données
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Connexion à la base de données
$servername = "localhost";
$username = "alexandra";
$password = "maman@1980";
$dbname = "client";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Récupérer et nettoyer les données du formulaire
$name = clean_input($_POST['name']);
$prenoms = clean_input($_POST['prenoms']);
$number = clean_input($_POST['number']);
$email = clean_input($_POST['email']);
$password = password_hash(clean_input($_POST['password']), PASSWORD_DEFAULT);  // Hasher le mot de passe

// Valider les données
if (empty($name) || empty($prenoms) || empty($number) || empty($email) || empty($_POST['password'])) {
    die("Tous les champs sont obligatoires.");
}

// Valider l'e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Format d'e-mail invalide.");
}

// Préparer et exécuter la requête SQL en utilisant des déclarations préparées
$stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenoms, numero, email, mot_de_passe) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $prenoms, $number, $email, $password);

if ($stmt->execute()) {
    echo "Enregistrement réussi.";
} else {
    echo "Erreur lors de l'enregistrement : " . $stmt->error;
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>