const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const Role = require('../models/role.model');
const UserRole = require('../models/userRole.model');
const Post = require('../models/post.model');

// User 1:1 Auth
User.hasOne(Auth, { foreignKey: 'id' });
Auth.belongsTo(User, { foreignKey: 'id' });

// User N:M Role
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

// User 1:N Post
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    User,
    Auth,
    Role,
    UserRole,
    Post,
};