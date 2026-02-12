import express from "express";
import {
  checkAuth,
  ForgotPassword,
  Login,
  LogOut,
  ResetPassword,
  SignUp,
  UpdateProfile,
  VerifyEmail,
} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(SignUp);
router.route("/login").post(Login);
router.route("/logout").post(LogOut);
router.route("/verify-email").post(VerifyEmail);
router.route("/forgot-password").post(ForgotPassword);
router.route("/reset-password/:token").post(ResetPassword);
router.route("/profile/update").put(isAuthenticated, UpdateProfile);

export default router;
