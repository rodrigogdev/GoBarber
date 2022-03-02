import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      provider_Id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
