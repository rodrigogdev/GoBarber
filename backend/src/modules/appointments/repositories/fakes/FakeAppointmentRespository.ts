import { nanoid } from "nanoid";
import { isEqual } from "date-fns";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = this.appointments.find((Appointment) =>
      isEqual(Appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    provider_Id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments | any> {
    const appointment = new Appointments();

    Object.assign(appointment, { id: nanoid(), date, provider_Id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
