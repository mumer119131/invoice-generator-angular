const User = require("../schema/user");


const decodeJSONWebToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
}


const handleGoogleLogin = async (req, res) => {
    
    const {credential} = req.body;
    const user = decodeJSONWebToken(credential);
    const isAlreadyUser = await User.findOne({email: user.email});
    if(isAlreadyUser){
        res.cookie('token', credential, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            }
        )
        return res.redirect('http://localhost:4200')
    }
    const userObject = new User(user);
    userObject.save();

    console.log(isAlreadyUser, user.email)
    res.cookie('token', credential, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        }
    )

    return res.redirect('http://localhost:4200')
        
}



const handleGoogleLogout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({message: 'Logged out successfully'});
}


module.exports = {handleGoogleLogin, handleGoogleLogout}