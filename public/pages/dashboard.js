class DashboardPage {
    constructor() {}

    load() {
        const token = this.token = authContext.getCachedToken('https://management.azure.com/');

        return api.getSubscriptions(token)
        .then((response) => {
            return this.subscription = response.value[0];
        })
        .then((subscription) => api.getResourceGroups(token, subscription))
        .then((projects) => {
            return this.html = `
                <div class="container">
                    <div class="flex align-center action-bar">
                        <div class="margin-left-20 margin-right-10">Projects</div>
                        <div class="count">${projects.length}</div>
                        <button id="add-project" class="button button-medium button-secondary margin-right-20 float-right">Add New Project</button>
                        <div class="popup" id="project-popup">
                            <i class="far fa-window-close" id="close-popup"></i>
                            <form id="create-resource-form">
                                <label class="margin-bottom-10">Enter Project Name</label>
                                <input type="text" name="resourceGroupName" class="input margin-bottom-10 three" />
                                <button class="button button-secondary button-medium">Create</button>
                            </form>
                        </div>
                    </div>
                    <ul id="projects-list" class="table">
                        ${projects.map((project) => `<li><a href='#dashboard/project/${project.name}' class="flex align-center"><i class="far fa-folder icon-box margin-right-10"></i><div>${project.name}</div></a></li>`).join('')}
                    </ul>
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

            this.createNewProject(this.token, this.subscription.subscriptionId, resourceGroupName).then((response) => {
                console.log(response);
                const node = document.createElement("li");
                node.innerHTML = `<a href="${response.name}">${response.name}</a>`;
                document.getElementById('projects-list').prepend(node);
                popup.style.display = 'none';
            });
        }, false);
    }

    registerProvider(accessToken, subscriptionId, resourceProviderNamespace) {
        return api.getProvider(accessToken, subscriptionId, resourceProviderNamespace).then((response) => {
            if (response.registrationState !== 'Registered') {
                return api.registerProvider(accessToken, subscriptionId, resourceProviderNamespace);
            } else {
                return Promise.resolve();
            }
        })
    }

    createNewProject(accessToken, subscriptionId, resourceGroupName) {
        return api.createResourceGroup(accessToken, subscriptionId, resourceGroupName)
            .then((response) => this.registerProvider(accessToken, subscriptionId, 'Microsoft.Web'))
            .then((response) => api.createAppServicePlan(accessToken, subscriptionId, resourceGroupName, resourceGroupName))
            .then((response) => api.createWebApp(accessToken, subscriptionId, resourceGroupName, resourceGroupName, resourceGroupName))
            .then((response) => api.createDatabaseAccount(accessToken, subscriptionId, resourceGroupName))
            .catch((response) => {
                document.getElementById('api_response').textContent = response;
            })
    }
}



// WHEN YOU ARE FIRST CREATING A RESOURCE GROUP WE SHOULD CHECK IF THAT WEBSITE EXISTS.