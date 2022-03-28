import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import ListClientAppointmentService from "@modules/appointments/services/ListClientAppointmentService";

export default class ClientAppointments {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listClientAppointment = container.resolve(
      ListClientAppointmentService
    );

    const appointments = await listClientAppointment.execute({
      user_id,
    });
    return response.json(classToClass(appointments));
  }
}
