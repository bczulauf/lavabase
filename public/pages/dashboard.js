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
                <div class="flex container">
                    <div class="twelve">
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

    createNewProject(access_token) {
        var subscriptionId;

        api.getSubscriptions(access_token)
            .then((response) => {
                document.getElementById('api_response').innerHTML = response.value.map((sub) => `<div>${sub.subscriptionId}</div>`).join("");
                
                subscriptionId = response.value[0].subscriptionId;
                return subscriptionId;
            })
            .then((subscriptionId) => api.createResourceGroup(access_token, subscriptionId, 'codeLikeAKidResourceGroup'))
            .then((response) => {
                document.getElementById('api_response').innerHTML = response.name;

                return response.name;
            })
            .then((resourceGroupName) => api.createHostingPlan(access_token, subscriptionId, resourceGroupName, 'codeLikeAKidHosting'))
            .then((response) => console.log(response))
            .catch((response) => {
                document.getElementById('api_response').textContent = response;
            })
    }
}