// On attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    const mdpInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submit');

    function updateCritere(id, isValid) {
        const element = document.getElementById(id);
        if (!element) return;

        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
            element.innerText = element.innerText.replace('✖', '✔');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
            element.innerText = element.innerText.replace('✔', '✖');
        }
    }

    function validateForm() {
        const value = mdpInput.value;
        const confirmValue = confirmInput.value;

        // Tests des critères (Regex)
        const cLength = value.length >= 8;
        const cMaj = /[A-Z]/.test(value);
        const cMin = /[a-z]/.test(value);
        const cNum = /[0-9]/.test(value);
        const cSpec = /[\%\?\*\#\!]/.test(value);
        const cMatch = value === confirmValue && value !== "";

        // Mise à jour visuelle
        updateCritere('length', cLength);
        updateCritere('majuscule', cMaj);
        updateCritere('minuscule', cMin);
        updateCritere('chiffre', cNum);
        updateCritere('special', cSpec);

        // Le bouton est activé seulement si TOUT est ok + mots de passe identiques
        submitBtn.disabled = !(cLength && cMaj && cMin && cNum && cSpec && cMatch);
    }

    mdpInput.addEventListener('input', validateForm);
    confirmInput.addEventListener('input', validateForm);
});