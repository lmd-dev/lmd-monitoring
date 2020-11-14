/**
 * Website list component
 * Displays websites list
 */
const WebsitesList = {
    template: `
        <div id="websites-list">
            <div class="list-body">
                <website-item v-for="website in this.$parent.websites" :website="website" />
            </div>
        </div>
        `,
    components: {
        WebsiteItem
    }
}