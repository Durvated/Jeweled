let auth0Client = null;

// Fetch Auth0 config
const fetchAuthConfig = () => fetch("/auth_config.json");

// Initialize Auth0 client
const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    auth0Client = await auth0.createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });
};

// Update UI based on authentication state
const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
};

// Log in function
const login = async () => {
    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
};

// Log out function
const logout = () => {
    auth0Client.logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    });
};

// Handle redirect callback and initialize app
window.onload = async () => {
    await configureClient();

    // Handle Auth0 redirect callback if present
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    updateUI();
};
