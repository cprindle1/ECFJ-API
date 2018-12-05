var rp = require('request-promise');

module.exports = {
    getClientId(req, res) {
        const clientId = process.env.client_id;
        const redirectUri = process.env.redirect_uri;
        const authDomain = process.env.auth_domain;
        res.status(200).json({
            clientId: clientId,
            authDomain: authDomain,
            authUrl: authDomain + "?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&response_type=code",
            success: true,
            message: 'Successfully retrieved client ID.'
        })
    }
}


// "https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9WmV5Mjg1VmZKcFR4JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ3--&redirect_uri=https://api.login.yahoo.com/oauth2/request_auth&response_type=code",
// "https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9ak5IZ2x5WmNsaHp6JmQ9WVdrOVNqQkJUMnRYTjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hYQ--&redirect_uri=oob&response_type=code&language=en-us