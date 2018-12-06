const oAuth = require('../controllers/').oAuth;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'ECFJ API!',
    }));

    app.get('/api/getClientId', oAuth.getClientId);
    app.post('/api/gettoken', oAuth.getToken);
}