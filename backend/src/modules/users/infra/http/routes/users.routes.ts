import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  "/",
  upload.single("avatar"),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      user_type: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
