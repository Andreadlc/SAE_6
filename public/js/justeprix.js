// On définit le nombre à trouver UNE SEULE FOIS au chargement
let randomNumber = Math.floor(Math.random() * 20) + 1;
alert("le nombre à trouver est : " + randomNumber); // Affiche le nombre à trouver pour les tests
let NBPartie = 1; // Initialisation du nombre de parties
let NB_essai = 0; // Initialisation du nombre d'essais
function verifierProposition() {
    // Récupération de la valeur saisie
    
    const inputElement = document.getElementById("guess");
    const userGuess = parseInt(inputElement.value);
    
    // Vérification si le champ n'est pas vide
    if (isNaN(userGuess)) {
        alert("Veuillez entrer un nombre valide.");
        return;
    }
    let htmlContent = `<li>Le nombre que tu as mis était : ${userGuess}</li>`;

    const resultList = document.getElementById("resultList");
    resultList.innerHTML += htmlContent;

    if (userGuess < randomNumber) {
        alert("Trop petit !");
        NB_essai++;
    } else if (userGuess > randomNumber) {
        alert("Trop grand !");
        NB_essai++;
    } else {
        alert("Correct ! Félicitations !");
        NB_essai++;
        resultList.innerHTML = ""; // Réinitialiser la liste des résultats
        let attemptsElement = document.getElementById("SaveGame");
        attemptsElement.innerHTML += `<tr><td>Partie ${NBPartie}</td><td>${NB_essai} essais</td></tr>`;
        NB_essai=0;
        randomNumber = Math.floor(Math.random() * 20) + 1; // Générer un nouveau nombre à trouver
        NBPartie++; // Incrémentation du nombre de parties à chaque tentative
    }

    
    
}