/**
 * WebsiteItem component
 * Display a website in the list of websites
 */
const WebsiteItem = {
    template: `
        <div class="website" :class="{'problem':website.hasProblem()}" @click="editWebsite">
            <div class="website-info">
                <div class="website-details">
                    <h2 class="website-title">{{ website.name }}</h2>
                    <p class="website-url">{{ website.url }}</p>
                </div>
                <div class="website-controls">
                    <div class="website-control" :class="{ 'ok':website.isURLAvailable(), 'ko': !website.isURLAvailable() }">URL ({{ website.expectedStatusCode }})</div>
                    <div class="website-control" :class="{ 'ok': website.checkSSL && website.isSSLOK(), 'ko': website.checkSSL && !website.isSSLOK(), 'disabled': !website.checkSSL }">SSL</div>
                </div>
                <div class="website-item-action remove" @click.stop="removeWebsite"></div>
            </div>
            <div class="website-statuses">
                <div class="website-status" v-for="state in getLastStatuses()" :class="{'ko':state.state === false}" :title="state.date"></div>
            </div>
        </div>
        `,
    props: {
        website: {
            type: Object,
            required: true
        }
    },
    methods: {
        editWebsite: function ()
        {
            this.$parent.$parent.editWebsite(this.website);
        },
        removeWebsite: function ()
        {
            this.$parent.$parent.askRemoveWebsite(this.website);
        },
        getLastStatuses: function ()
        {
            return this.website.getLastStatuses(Math.trunc((document.body.clientWidth - 40) / 5));
        }
    }

}