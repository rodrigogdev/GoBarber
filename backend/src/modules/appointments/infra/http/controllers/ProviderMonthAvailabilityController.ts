import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_Id } = request.params;
    const { month, year } = request.query;

    const listProviderMontAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMontAvailability.execute({
      provider_Id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
