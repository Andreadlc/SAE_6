// On attend que le DOM soit chargé pour être sûr que les éléments existent
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Bascule entre 'password' et 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Change l'icône (optionnel)
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
});