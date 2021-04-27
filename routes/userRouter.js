const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.post("/register", userController.register_post);
router.post("/login", userController.login_post);
router.post("/token", userController.token_post);
router.post("/tokenValidate", userController.tokenValidate_post);

module.exports = router;
