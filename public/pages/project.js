class ProjectPage {
    constructor() {}

    load(options) {
        this.resouceGroupName = options.params[1];
        return this.html = `
            <div class="container flex">

            </div>
            `;
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }

    postShow() {

    }
}