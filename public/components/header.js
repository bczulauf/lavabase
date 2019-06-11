class Header {
    constructor() {}

    load(options) {
        return this.html = `
            <div class="flex header align-center">
                <a href="#" class="logo-text flex align-center">
                    <i class="fas fa-fire-alt logo margin-right-10"></i>
                    <div>Lavabase</div>
                </a>
                <div id="user" class="float-right flex">
                    <div id="user-name"></div>
                    <a href="#" onclick="authContext.logOut(); return false;" class="margin-left-20">Log out</a>
                </div>
            </div>
            `
    }

    show(el) {
        const div = this.el = document.createElement("div")
        div.innerHTML = this.html
        el.appendChild(div)
    }

    postShow() {
        var user = authContext.getCachedUser();
        document.getElementById('user-name').textContent = user.profile.name;
        document.getElementById('user').style.display = 'flex';
    }
}