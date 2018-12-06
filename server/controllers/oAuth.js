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
        const tokenDomain = process.env.token_domain;
        rp.post({
            headers: {
                'Authorization': "Basic " + encoded,
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: tokenDomain,
            body: "grant_type=authorization_code&redirect_uri=oob&code=" + req.body.code

        }).then((postRes) => {
            res.status(200).json({
                accessToken: JSON.parse(postRes).access_token,
                xoAuthYahooGuid: JSON.parse(postRes).xoauth_yahoo_guid,
                refreshToken: JSON.parse(postRes).refresh_token,
                success: true,
                message: 'Successfully retrieved token.'
            })
        }).catch((error) => {
            console.error("Token Retrieval Error: " + error);
            res.status(500).json({
                error: error,
                success: false,
                message: 'Failed to retrieve token.'
            });
        });
    }
}