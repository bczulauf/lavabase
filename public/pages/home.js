class HomePage {
    constructor() {}

    load() {
        return this.html = `
            <div class="flex header align-center center margin-bottom-60">
                <i class="fas fa-fire-alt logo margin-right-10"></i><a href="#" class="logo-text">Lavabase</a>
            </div>
            <div class="flex center">
                <div class="nine">
                    <h1 class="text-center">The easy way to build apps on the Microsoft cloud</h1>

                    <div class="flex center margin-bottom-100">
                        <button id="home-login-button" class="button button-primary button-large">Go!</button>
                    </div>
                    <h2 class="text-center">What happens when I click Go?</h2>
                    <div class="flex margin-bottom-100">
                        <div class="rounded-block col three">
                            <div class="flex center">
                                <i class="fab fa-microsoft icon"></i>
                            </div>
                            <p>You sign in to your Microsoft Azure account and pick a name for your web app.</p>
                        </div>
                        <div class="rounded-block col three">
                            <div class="flex center">
                                <i class="fas fa-database icon"></i>
                            </div>
                            <p>We create a web app with a real-time document database.</p>
                        </div>
                        <div class="rounded-block col three">
                            <div class="flex center">
                                <i class="fas fa-code icon"></i>
                            </div>
                            <p>You write code and use our tools to add features like Active Directory and we make it run.</p>
                        </div>
                    </div>
                    <h2 class="text-center">Wow. How much does it cost?</h2>
                    <h1 class="emphasis text-center">Zero</h1>
                    <p class="text-center">We don't charge you anything. You simply pay for your normal Microsoft Azure services.</p>
                </div>
            </div>
            `;
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }

    postShow() {
        document.getElementById('home-login-button').addEventListener('click', (evt) => {
            this.signIn();
        });
    }

    signIn() {
        authContext.login();
    }
}