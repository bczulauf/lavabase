class DashboardPage {
    constructor() {}

    load() {
        const token = this.token = authContext.getCachedToken('https://management.azure.com/');

        return this.getSubscriptions(token)
        .then((response) => {
            return this.subscription = response.value[0];
        })
        .then((subscription) => this.getResourceGroups(token, subscription))
        .then((projects) => {
            return this.html = `
                <div class="flex container">
                    <div class="twelve">
                        <div class="flex align-center action-bar">
                            <div class="margin-left-10">Projects</div>
                            <div>(${projects.length})</div>
                            <button id="add-project" class="button button-medium button-secondary margin-right-10 float-right">Add New Project</button>
                        </div>
                        <ul id="projects-list" class="list">
                            ${projects.map((project) => `<li class="col three"><a href='#dashboard/project/${project.name}'>${project.name}</a></li>`).join('')}
                        </ul>
                        <div class="popup" id="project-popup">
                            <i class="far fa-window-close" id="close-popup"></i>
                            <form id="create-resource-form">
                                <label class="margin-bottom-10">Enter Project Name</label>
                                <input type="text" name="resourceGroupName" class="input margin-bottom-10" />
                                <button class="button button-secondary button-medium">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    show(el) {
        const div = this.el = document.createElement("div");
        div.innerHTML = this.html;
        el.appendChild(div);
    }

    postShow() {
        const popup = document.getElementById('project-popup');
        document.getElementById('add-project').addEventListener('click', (evt) => {
            popup.style.display = "block";
        });

        document.getElementById('close-popup').addEventListener('click', (evt) => {
            popup.style.display = "none";
        });

        document.getElementById('create-resource-form').addEventListener('submit', (evt) => {
            evt.preventDefault()
            var resourceGroupName = new FormData(evt.target).get('resourceGroupName');
            createResourceGroup(this.token, this.subscription.subscriptionId, resourceGroupName).then((response) => {
                const node = document.createElement("li");
                node.innerHTML = `<a href="${response.name}">${response.name}</a>`;
                document.getElementById('projects-list').prepend(node);
                popup.style.display = 'none';
            });
        }, false);
    }

    getSubscriptions(access_token) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://management.azure.com/subscriptions?api-version=2016-06-01', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.send();

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                // Only run if the request is complete.
                if (xhr.readyState !== 4) return;

                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // TODO: Do something with the error (or non-200 responses)
                    reject('ERROR:\n\n' + xhr.responseText);
                }
            };
        });
    }

    getResourceGroups(access_token, subscription) {
        if (!subscription) {
            return Promise.resolve([]);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://management.azure.com/subscriptions/${subscription.subscriptionId}/resourcegroups?api-version=2018-05-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.send();

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                // Only run if the request is complete.
                if (xhr.readyState !== 4) return;

                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).value);
                } else {
                    // TODO: Do something with the error (or non-200 responses)
                    reject('ERROR:\n\n' + xhr.responseText);
                }
            };
        });
    }
}