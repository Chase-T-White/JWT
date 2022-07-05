// Check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard
const {BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    };

    const id = new Date().getDate();

    // Try to keep payload small, better experience for user
    // Just for demo, JWT_SECRET in production use long, complex and unguessable string value!!!!!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).json({msg: 'User created', token});
};

const dashboard = async (req, res) => {
    const user = req.user;
    
    const lucky = Math.floor(Math.random() * 100);
    res.status(200).json({msg: `Hello, ${user.username}`, secret: `Here is your authorized data, your lucky number is ${lucky}`});
   
};

module.exports = {
    login,
    dashboard
}