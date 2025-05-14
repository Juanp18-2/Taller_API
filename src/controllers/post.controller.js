    const { Post, User } = require("../db/associations");
    const response = require("../red/response");
    const fs = require("fs");

    class PostController {
    static async getAll(req, res, next) {
        try {
        const posts = await Post.findAll({ 
            include: { 
            model: User,
            attributes: ['id', 'username', 'avatar'] 
            } 
        });
        
        let data = "";
        if (posts.length > 0) {
            data = {
            total_posts: posts.length,
            posts: posts,
            };
        } else {
            data = {
            message: "No posts found",
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
        const id = req.params.id;
        const post = await Post.findOne({
            where: { id },
            include: { 
            model: User,
            attributes: ['id', 'username', 'avatar'] 
            }
        });
        
        let data = "";
        if (post) {
            data = {
            post: post,
            };
        } else {
            data = {
            message: "Post not found",
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }

    static async create(req, res, next) {
        try {
        const { user_id, title, content } = req.body;
        const image_url = req.file ? `http://localhost:3000/uploads/images/posts/${req.file.filename}` : null;
        
        const newPost = await Post.create({
            user_id,
            title,
            content,
            image_url
        });
        
        const message = {
            msg: "Post created successfully",
            postID: newPost.id,
        };
        
        response.success(req, res, message, 201);
        } catch (error) {
        next(error);
        }
    }

    static async update(req, res, next) {
        try {
        const id = req.params.id;
        const { title, content } = req.body;
        let image_url = null;
        
        if (req.file) {
            // Eliminar la imagen anterior si existe
            const post = await Post.findByPk(id);
            if (post.image_url) {
            const oldImagePath = post.image_url.replace('http://localhost:3000', 'src');
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error deleting old image:", err);
            });
            }
            
            image_url = `http://localhost:3000/uploads/images/posts/${req.file.filename}`;
        }
        
        const [updated] = await Post.update(
            { title, content, ...(image_url && { image_url }) },
            { where: { id } }
        );
        
        let message = "";
        if (updated) {
            message = {
            msg: "Post updated successfully",
            postID: id,
            };
        } else {
            message = {
            msg: "Post not found or no changes made",
            };
        }
        
        response.success(req, res, message, 200);
        } catch (error) {
        next(error);
        }
    }

    static async delete(req, res, next) {
        try {
        const id = req.params.id;
        
        // Eliminar la imagen asociada si existe
        const post = await Post.findByPk(id);
        if (post && post.image_url) {
            const imagePath = post.image_url.replace('http://localhost:3000', 'src');
            fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting image:", err);
            });
        }
        
        const deleted = await Post.destroy({ where: { id } });
        
        let message = "";
        if (deleted) {
            message = {
            msg: "Post deleted successfully",
            postID: id,
            };
        } else {
            message = {
            msg: "Post not found",
            };
        }
        
        response.success(req, res, message, 200);
        } catch (error) {
        next(error);
        }
    }

    static async getByUser(req, res, next) {
        try {
        const userId = req.params.userId;
        const posts = await Post.findAll({ 
            where: { user_id: userId },
            include: { 
            model: User,
            attributes: ['id', 'username', 'avatar'] 
            }
        });
        
        let data = "";
        if (posts.length > 0) {
            data = {
            total_posts: posts.length,
            posts: posts,
            };
        } else {
            data = {
            message: "No posts found for this user",
            };
        }
        response.success(req, res, data, 200);
        } catch (error) {
        next(error);
        }
    }
    }

    module.exports = PostController;