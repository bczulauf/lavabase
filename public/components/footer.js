class Footer {
    constructor() {}

    load() {
        return this.html = `
            <div class="flex footer align-center center">
                <div class="margin-right-10">Made with</div><i class="fas fa-fire-alt logo margin-right-10"></i><div>in Seattle</div>
            </div>
            `;
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }
}