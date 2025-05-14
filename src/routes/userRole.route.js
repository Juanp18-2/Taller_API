const router = require("express").Router();

const controller = require("../controllers/userRole.controller");
const validation = require("../middleware/validation");
const { verifyToken, isAdmin } = require("../auth");

router.get("/", [verifyToken, isAdmin], controller.getAll);
router.get("/user/:userId", verifyToken, controller.getRolesByUser);
router.get("/role/:roleId", [verifyToken, isAdmin], controller.getUsersByRole);
router.post("/assign", [verifyToken, isAdmin, validation(0)], controller.assignRoleToUser);
router.post("/remove", [verifyToken, isAdmin, validation(0)], controller.removeRoleFromUser);

module.exports = router;