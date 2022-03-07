import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderAppointmentService from "@modules/appointments/services/ListProviderAppointmentService";
import { classToClass } from "class-transformer";

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_Id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentService
    );

    const appointments = await listProviderAppointment.execute({
      provider_Id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(classToClass(appointments));
  }
}
