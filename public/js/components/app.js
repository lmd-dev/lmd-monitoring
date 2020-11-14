/**
 * Application compoenent
 * Displays application components
 */
const App = {
    template: `
        <div id="content">
            <appheader />
            <websites />
        </div>
                `,
    
    components: {
        appheader: AppHeader,
        websites: Websites
    },
}
