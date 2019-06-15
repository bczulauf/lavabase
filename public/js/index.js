const authContext = new AuthenticationContext({
    clientId: '7d777b21-035c-491c-874d-7db83f15873d',
    resource: 'https://management.azure.com/',
    popUp: true,
    callback : loginCallback
});

function getToken(resourceURL) {
    const token = authContext.getCachedToken(resourceURL);

    return new Promise(function(resolve, reject) {
        if (token) {
            resolve(token);
        }

        authContext.acquireToken(resourceURL, function(error, token) {
            if (error) {
                console.log(error)
                authContext.acquireTokenPopup(resourceURL, null, null,  (errorDesc, token, error) => {
                    // Handle ADAL Error
                    if (error || !token) {
                        reject('ADAL Error Occurred: ' + error);
                    }

                    resolve(token);
                });
            } else {
                resolve(token);
            }
        });
    });
}

function loginCallback(error, token) {
    if (error) {
        console.log(error)
    } else {
        getToken('https://management.azure.com/').then((token) => {
            router.navigate('dashboard')
        })
    }
}

const api = new API();
const util = new Util();
const router = new Router(
    {
        home: new Layout (
            new HomePage(),
            new Footer()
        ),
        dashboard: new Layout (
            new Header(),
            new Breadcrumb(),
            new DashboardPage(),
            new Footer()
        )

    },
    document.getElementById('main')
);
router.listen();