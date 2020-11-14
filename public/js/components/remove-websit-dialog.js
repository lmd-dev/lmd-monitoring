/**
 * Remove Website Dialog component
 * Displays a dialog to confirm the deleting of a website
 */
const RemoveWebsiteDialog = {
    template: `
        <div class="dialog-background">
            <div class="dialog-window">
                <h2 class="dialog-title">Suppression d'un site web</h2>
                <p>Souhaitez-vous réellement supprimer le site {{ website.name }} ?</p>
                <div class="dialog-actions">
                    <button v-on:click="this.$parent.removeWebsite">Oui</button>
                    <button v-on:click="this.$parent.cancelRemoveWebsite">Non</button>
                </div>
            </div>
        </div>
    `,
    props: {
        website: {
            type: Object,
            required: true
        }
    }
}