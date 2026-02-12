import express  from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addMenu,  editMenu } from "../controller/menu.controller";

const router = express.Router();

router.route("/").post(isAuthenticated , upload.single("image"), addMenu );
router.route("/:id").put(isAuthenticated , upload.single("image"), editMenu );
// router.route("/:id").post(isAuthenticated , deleteMenu );



export default router