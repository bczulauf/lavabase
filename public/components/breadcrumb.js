class Breadcrumb {
    constructor() {
        this.sitemap = {
            dashboard: true,
            project: true,
            database: true
        }
    }

    load(options) {
        const params = options.params[0].split("/");
        const breadcrumbs = params.map((val, index) => {
           const arr = params.slice(0, index + 1);
           const href = arr.join('/');

           return {link: href, name: val};
        });

        return this.html = `
            <div class="breadcrumb flex align-center">
                ${breadcrumbs.map((breadcrumb, index) => `<a href='#${breadcrumb.link}'>${breadcrumb.name}</a>${breadcrumbs.length !== index + 1 ? '<div class="slash">/</div>': ''}`).join("")}
            </div>
            `
    }

    show(el) {
        const div = this.el = document.createElement("div")
        div.innerHTML = this.html
        el.appendChild(div)
    }
}