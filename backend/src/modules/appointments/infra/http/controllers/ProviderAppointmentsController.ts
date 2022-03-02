import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderAppointmentService from "@modules/appointments/services/ListProviderAppointmentService";

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_Id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentService
    );

    const appointments = await listProviderAppointment.execute({
      provider_Id,
      day,
      month,
      year,
    });
    return response.json(appointments);
  }
}
