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
    },

    getToken(req, res) {
        const encoded = process.env.encoded_client_id_client_secret;
        const authDomain = process.env.auth_domain;
        const redirectUri = process.env.redirect_uri;
        rp.post({
            headers: {
                'Authorization': "Basic " + encoded,
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: authDomain + "/oauth2/get_token",
            body: "grant_type=authorization_code&redirect_uri=" + redirectUri + "&code=" + req.body.code

        }).then((postRes) => {
            res.status(200).json({
                token: postRes.access_token,
                success: true,
                message: 'Successfully retrieved token.'
            }).catch((error) => {
                console.error("Token Retrieval Error: " + error);
                res.status(500).json({
                    error: error,
                    success: false,
                    message: 'Failed to retrieve token.'
                });
            });
        });
    }
}