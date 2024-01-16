<?php
session_start(); // Démarrez la session (si ce n'est pas déjà fait)

// Connexion à la base de données
$servername = "localhost";
$username = "alexandra";
$password = "maman@1980";
$dbname = "cli";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Récupérer et nettoyer les données du formulaire
$email = $_POST['email'];
$password = $_POST['password'];

// Valider les données
if (empty($email) || empty($password)) {
    die("Tous les champs sont obligatoires.");
}

// Requête SQL pour vérifier l'utilisateur dans la base de données
$sql = "SELECT * FROM utilisateurs WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Vérifier le mot de passe
    if (password_verify($password, $row['mot_de_passe'])) {
        // Mot de passe correct, connecter l'utilisateur
        $_SESSION['user_id'] = $row['id']; // Stocker l'ID de l'utilisateur dans la session, par exemple

        header("Location: tableau_de_bord.php"); // Rediriger vers la page du tableau de bord
        exit();
    } else {
        die("Mot de passe incorrect.");
    }
} else {
    die("Utilisateur non trouvé.");
}

// Fermer la connexion
$conn->close();
?>