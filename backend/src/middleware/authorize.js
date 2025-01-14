const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


async function authenticate(req, res, next) {
    try {
        
        const token = req.cookies.token;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        req.user = payload;
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('http://localhost:4200/login');
    }
}


module.exports = {authenticate};