const express = require("express");
const router = express.Router();

const user = require("../controller/userController");
const validate = require("../validators/user/user_validation");
const { upload } = require("../middleware/imageStorage");

router.post("/signup",upload.single("profilePic"),validate.registerUserValidation,user.signupUserApi);
router.post("/login", user.loginUserApi);
router.post("/forgotpassword", user.forgotUserApi);
router.post('/resetpassword/:userId/:token',validate.resetUserValidation,user.resetPasswordApi)

module.exports = router;
