// Check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard
const CustomAPIError = require('../errors/custom-errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400);
    };

    const id = new Date().getDate();

    // Try to keep payload small, better experience for user
    // Just for demo, JWT_SECRET in production use long, complex and unguessable string value!!!!!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).json({msg: 'User created', token});
};

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const lucky = Math.floor(Math.random() * 100);
        res.status(200).json({msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is ${lucky}`});
    } catch (err) {
        throw new CustomAPIError('Not authorized to access this route', 401);
    };

};

module.exports = {
    login,
    dashboard
}