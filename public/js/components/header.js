/**
 * header componenet
 * Displays the header of the application
 */
const AppHeader = {
    template: `
            <div id="app-header">
                <h1 id="app-title">Websites Monitoring</h1>
                <button id="btn-new-website">Monitorer un nouveau site</button>
                <button @click="logout">Déconnexion</button>
            </div>
        `,
    methods: {
        logout: async function ()
        {
            await fetch("/auth/logout", { method: 'post' });

            location.replace('/');
        }
    }
}