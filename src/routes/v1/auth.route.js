const express = require("express");
const validate = require("../../middlewares/validate");
const { authValidation } = require("../../validations/index");
const authController = require("../../controllers/auth.controller");
const passport = require("passport");
const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post(
  "/login",
  validate(authValidation.login),
  authController.emailAndPasswordLogin
);

router.post("/logout", authController.logout);

router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

// router.post(
//   "/forgot-password",
//   validate(authValidation.forgotPassword),
//   authController.forgotPassword
// );

router.post("/forgot-password", (req, res) => {
  console.log("POST /forgot-password hit");
  console.log("Request Body:", req.body); // Log the incoming request body for debugging

  // Simulate sending the email and respond with a success message
  res.status(200).json({ message: "Password reset email sent" });
});


router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  "/send-verification-email",
  authController.sendVerificationEmail
);

router.post(
  "/verify-email",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

router.post("/change-password",
  authController.changePassword
)


module.exports = router;
