const jwt = require('jsonwebtoken');
const { Auth } = require('../models/auth.model');
const { errorResponse } = require('../red/response');

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    
    if (!token) 
    {
        return errorResponse(req, res, 403, 'No token provided');
    }

    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const auth = await Auth.findByPk(decoded.id);
        
        if (!auth) 
        {
            return errorResponse(req, res, 404, 'User not found');
        }
        
        req.userId = decoded.id;
        next();
    }   catch (error) 
    {
        return errorResponse(req, res, 401, 'Unauthorized', error);
    }
    };

    const isAdmin = async (req, res, next) => 
    {
        try 
        {
            const userRoles = await UserRole.findAll({
            where: { user_id: req.userId },
            include: [{ model: Role }],
            });

            const isAdmin = userRoles.some
            (userRole => 
                userRole.Role.name === 'admin'
            );

            if (!isAdmin)  
            {
                return errorResponse(req, res, 403, 'Require Admin Role');
            }

            next();
        } catch 
        (error) 
            {
                return errorResponse(req, res, 500, 'Error verifying role', error);
            }
    };

    module.exports = { verifyToken, isAdmin };