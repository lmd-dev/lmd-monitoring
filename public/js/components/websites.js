/**
 * Websites component
 * Responsible for the management of websites
 */
const Websites = {
    template: `
        <div id="websites">
            <websiteslist />
            <editWebsiteDialog v-if="this.editedWebsite" :website="this.editedWebsite" />
            <removeWebsiteDialog v-if="this.removedWebsite" :website="this.removedWebsite" />
        </div>
        `,
    components: {
        websiteslist: WebsitesList,
        editWebsiteDialog: EditWebsiteDialog,
        removeWebsiteDialog: RemoveWebsiteDialog
    },
    data: function ()
    {
        return {
            websites: [],
            editedWebsite: null,
            removedWebsite: null
        }
    },
    mounted: function ()
    {
        document.getElementById('btn-new-website').addEventListener('click', () => { this.newWebsite(); });

        this.loadWebsites();
    },
    methods: {
        newWebsite: function ()
        {
            this.editedWebsite = new Website();
        },
        editWebsite: function (website)
        {
            this.editedWebsite = website;
        },
        cancelEditWebsite: function ()
        {
            this.editedWebsite = null;
        },
        saveWebsite: async function ()
        {
            if (this.editedWebsite.id == 0)
            {
                let results = await fetch('/api/website', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.editedWebsite.toArray())
                });

                if (results.status === 201)
                {
                    let json = await results.json();
                    this.editedWebsite.fromArray({ id: json.id });

                    this.websites.push(this.editedWebsite);
                    this.editedWebsite = null;
                }
            }
            else
            {
                let results = await fetch('/api/website/' + this.editedWebsite.id, {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.editedWebsite.toArray())
                });

                if (results.status === 200)
                {
                    this.editedWebsite = null;
                }
            }
        },
        askRemoveWebsite: function (website)
        {
            this.removedWebsite = website;
        },
        cancelRemoveWebsite: function ()
        {
            this.removedWebsite = null;
        },
        removeWebsite: async function ()
        {
            if (this.removedWebsite)
            {
                let results = await fetch('/api/website/' + this.removedWebsite.id, {
                    method: 'delete'
                });

                if (results.status === 200)
                {
                    let index = this.websites.findIndex(item => item.id == this.removedWebsite.id);

                    if (index != -1)
                    {
                        this.websites.splice(index, 1);
                        this.removedWebsite = null;
                    }
                }
            }
        },
        loadWebsites: async function ()
        {
            let response = await fetch('/api/website/', { method: 'GET' });
            let json = await response.json();
            this.websites = json.websites?.map((data) =>
            {
                return new Website(data);
            });

            this.websites.sort((a, b) =>
            {
                if (a.hasProblem() && !b.hasProblem())
                    return 1
                else if (b.hasProblem() && !a.hasProblem())
                    return -1
                else if (a.name > b.name)
                    return 1;
                else if (b.name > a.name)
                    return -1;
                else
                    return 0;
            });

            setTimeout(() =>
            {
                this.loadWebsites();
            }, 900000);
        }
    }
}