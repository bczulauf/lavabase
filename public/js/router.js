class Router {
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
    }

    listen () {
        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    navigate (path) {
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }

    hashChanged (ev) {
        const hash = window.location.hash;
        const user = authContext.getCachedUser();
        const route = hash && user ? hash.substr(1) : 'home'; // If no hash or no user, navigate to home page.
        
        if (user && route === 'home') {
            return this.navigate('dashboard'); // If user is logged in and route is home, redirect to projects.
        }

        // Makes sure we have a valid access token for azure resource manager.
        if (user) {
            getToken('https://management.azure.com/').then((token) => {
                this.show(route);
            });
        } else {
            this.show(route);
        }
    }

    async show (pageName) {
        var page
        const routes = this.routes

        for (var route in routes) {
            const match = pageName.match(route)
            if (match) {
                page = routes[route]
                await page.load({ params: match })
                this.el.innerHTML = ''
                page.show(this.el)
                // Scrolls page to top.
                document.body.scrollTop = 0
                break
            }
        }
    }
}