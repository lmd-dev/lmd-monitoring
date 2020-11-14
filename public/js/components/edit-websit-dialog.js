/**
 * Edit website dialog component
 * Displays a dialog to edit website properties
 */
const EditWebsiteDialog = {
    template: `
        <div class="dialog-background">
            <div class="dialog-window">
                <h2 class="dialog-title">Edition d'un site web</h2>
                <div class="field">
                    <label class="field-label">Nom</label>
                    <input type="text" v-model="website.name" />
                </div>
                <div class="field">
                    <label class="field-label">URL</label>
                    <input type="text" v-model="website.url" />
                </div>
                <div class="field">
                    <label class="field-label">Status code</label>
                    <input type="number" v-model.number="website.expectedStatusCode" />
                </div>
                <div class="field">
                    <label class="field-label">Vérifier le certificat SSL</label>
                    <input type="checkbox" v-model="website.checkSSL" />
                </div>
                <div class="dialog-actions">
                    <button v-on:click="this.$parent.saveWebsite">OK</button>
                    <button v-on:click="this.$parent.cancelEditWebsite">Annuler</button>
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