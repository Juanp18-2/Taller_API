const router = require("express").Router();
const multer = require("multer");
const storage = require("../middleware/post-image.multer");

const controller = require("../controllers/post.controller");
const validation = require("../middleware/validation");
const { verifyToken } = require("../auth");

const uploader = multer({ storage });

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.get("/user/:userId", controller.getByUser);
router.post("/", [verifyToken, uploader.single("image")], controller.create);
router.put("/:id", [verifyToken, uploader.single("image")], controller.update);
router.delete("/:id", verifyToken, controller.delete);

module.exports = router;