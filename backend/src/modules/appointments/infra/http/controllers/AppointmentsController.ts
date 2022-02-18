import { Request, Response } from "express";
import parseISO from "date-fns/parseISO";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_Id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_Id,
    });

    return response.json(appointment);
  }
}
