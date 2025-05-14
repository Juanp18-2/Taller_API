    const { UserRole, User, Role } = require("../db/associations");
    const response = require("../red/response");

    class UserRoleController {
    static async getAll(req, res, next) {
        try {
        const userRoles = await UserRole.findAll({
            include: [
            { model: User, attributes: ['id', 'username', 'email'] },
            { model: Role, attributes: ['id', 'name'] }
            ]
        });
        
        let data = "";
        if (userRoles.length > 0) {
            data = {
            total_relations: userRoles.length,
            userRoles: userRoles,
            };
        } else {
            data = {
            message: "No user-role relations found",
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }

    static async getRolesByUser(req, res, next) {
        try {
        const userId = req.params.userId;
        const userRoles = await UserRole.findAll({
            where: { user_id: userId },
            include: { model: Role, attributes: ['id', 'name', 'description'] }
        });
        
        let data = "";
        if (userRoles.length > 0) {
            data = {
            total_roles: userRoles.length,
            roles: userRoles.map(ur => ur.Role),
            };
        } else {
            data = {
            message: "User has no assigned roles",
            userId: userId
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }

    static async getUsersByRole(req, res, next) {
        try {
        const roleId = req.params.roleId;
        const userRoles = await UserRole.findAll({
            where: { role_id: roleId },
            include: { model: User, attributes: ['id', 'username', 'email', 'avatar'] }
        });
        
        let data = "";
        if (userRoles.length > 0) {
            data = {
            total_users: userRoles.length,
            users: userRoles.map(ur => ur.User),
            };
        } else {
            data = {
            message: "No users found with this role",
            roleId: roleId
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }

    static async assignRoleToUser(req, res, next) {
        try {
        const { user_id, role_id } = req.body;
        
        // Verificar si la relación ya existe
        const existingRelation = await UserRole.findOne({ 
            where: { user_id, role_id } 
        });
        
        if (existingRelation) {
            return response.success(req, res, {
            msg: "Role already assigned to this user",
            user_id,
            role_id
            }, 200);
        }
        
        const newUserRole = await UserRole.create({ user_id, role_id });
        
        response.success(req, res, {
            msg: "Role assigned to user successfully",
            relation: newUserRole
        }, 201);
        } catch (error) {
        next(error);
        }
    }

    static async removeRoleFromUser(req, res, next) {
        try {
        const { user_id, role_id } = req.body;
        
        const deleted = await UserRole.destroy({ 
            where: { user_id, role_id } 
        });
        
        let message = "";
        if (deleted) {
            message = {
            msg: "Role removed from user successfully",
            user_id,
            role_id
            };
        } else {
            message = {
            msg: "Relation not found",
            user_id,
            role_id
            };
        }
        
        response.success(req, res, message, 200);
        } catch (error) {
        next(error);
        }
    }
    }

    module.exports = UserRoleController;