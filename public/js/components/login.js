/**
 * Login component
 * Displays the login form
 */
const Login = {
    template: `
        <form action="/auth/login" method="post">
            <p><input type="text" name="login" placeholder="Utilisateur" autocomplete="off"/></p>
            <p><input type="password" name="password" placeholder="Mot de passe" /></p>
            <p><button>Connexion</button></p>
        </form>
                `,
}
