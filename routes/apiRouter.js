const { Router } = require("express");
const apiController = require("../controllers/apiController");
const router = Router();

router.get("/information", apiController.information_get);

module.exports = router;
