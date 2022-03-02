import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ProvidersController from "../controllers/ProvidersController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", providersController.index);
providersRouter.get(
  "/:provider_Id/month-availability",
  celebrate({
    [Segments.PARAMS]: {
      provider_Id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
);
providersRouter.get(
  "/:provider_Id/day-availability",
  celebrate({
    [Segments.PARAMS]: {
      provider_Id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
);

export default providersRouter;
