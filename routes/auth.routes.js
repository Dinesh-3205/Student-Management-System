const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const { joiUserSchema } = require("../validations/user.validation");
const controller = require("../controllers/auth.controller");

router.post("/signup", validate(joiUserSchema), controller.signup);
router.post("/login", controller.login);
router.get("/userget", auth, controller.getUser);
router.put("/userupdate", auth, controller.updateUser);
router.post("/logout", auth, controller.logout);

module.exports = router;
