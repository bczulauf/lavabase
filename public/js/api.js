class API {
    constructor() {}

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

    createResourceGroup(access_token, subscriptionId, resourceGroupName) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}?api-version=2018-05-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({location: 'West US 2'}));

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

    getProvider(access_token, subscriptionId, resourceProviderNamespace) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://management.azure.com/subscriptions/${subscriptionId}/providers/${resourceProviderNamespace}?api-version=2019-05-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

    // Registers a subscription with a resource provider.
    registerProvider(access_token, subscriptionId, resourceProviderNamespace) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `https://management.azure.com/subscriptions/${subscriptionId}/providers/${resourceProviderNamespace}/register?api-version=2019-05-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({locations: ['West US 2']}));

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

    createAppServicePlan(access_token, subscriptionId, resourceGroupName, planName) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Web/serverfarms/${planName}?api-version=2016-09-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
              "location": "West US 2",
              "sku": {
                    "name": "B1",
                    "tier": "Basic",
                    "size": "B1",
                    "family": "B",
                    "capacity": 1
                }
        }));

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                // Only run if the request is complete.
                if (xhr.readyState !== 4) return;

                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // TODO: Do something with the error (or non-200 responses)
                    reject('ERROR:\n\n' + xhr.responseText);
                }
            };
        });
    }

    createWebApp(access_token, subscriptionId, resourceGroupName, serverFarmId, webAppName) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Web/sites/${webAppName}?api-version=2016-08-01`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
            location: 'West US 2',
            "properties" : {
                "serverFarmId": serverFarmId,
            }
        }));

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                // Only run if the request is complete.
                if (xhr.readyState !== 4) return;

                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // TODO: Do something with the error (or non-200 responses)
                    reject('ERROR:\n\n' + xhr.responseText);
                }
            };
        });
    }

    createDatabaseAccount(access_token, subscriptionId, resourceGroupName, dbAccountName) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${dbAccountName}?api-version=2015-04-08`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function () {
                // Only run if the request is complete.
                if (xhr.readyState !== 4) return;

                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    // TODO: Do something with the error (or non-200 responses)
                    reject('ERROR:\n\n' + xhr.responseText);
                }
            };
        });
    }

    createCosmosDB(access_token, dbAccount, dbID) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://${dbAccount}.documents.azure.com/dbs`, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({id: dbID}));

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
}