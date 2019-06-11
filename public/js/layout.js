class Layout {
    constructor(...components) {
        this.components = components
    }

    load(options) {
        return Promise.all(this.components.map(component => component.load(options)))
    }

    show(el) {
        const div = document.createElement('div')
        div.className = "layout"
        
        for (let component of this.components) {
            component.show(div)
        }

        el.appendChild(div)
        this.postShow()
    }

    postShow() {
        for (let component of this.components) {
            component.postShow && component.postShow()
        }
    }
}