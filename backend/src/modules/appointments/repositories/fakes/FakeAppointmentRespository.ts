import { nanoid } from "nanoid";
import { getDate, getMonth, getYear, isEqual } from "date-fns";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllinMonthProviderDTO from "@modules/appointments/dtos/IFindAllinMonthProviderDTO";
import IFindAllinDayProviderDTO from "@modules/appointments/dtos/IFindAllinDayProviderDTO";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointments[] = [];

  public async findAllFromClient(user_id: string): Promise<Appointments[]> {
    const dataAppointments = this.appointments.filter((appointment) => {
      return appointment.user_id === user_id;
    });

    return dataAppointments;
  }

  public async findByDate(
    date: Date,
    provider_Id: string
  ): Promise<Appointments | undefined> {
    const findAppointment = this.appointments.find(
      (Appointment) =>
        isEqual(Appointment.date, date) &&
        Appointment.provider_Id === provider_Id
    );

    return findAppointment;
  }

  public async findAllInMonthProvider({
    provider_Id,
    month,
    year,
  }: IFindAllinMonthProviderDTO): Promise<Appointments[]> {
    const appointments = this.appointments.filter((appointment) => {
      return (
        appointment.provider_Id === provider_Id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_Id,
    day,
    month,
    year,
  }: IFindAllinDayProviderDTO): Promise<Appointments[]> {
    const appointments = this.appointments.filter((appointment) => {
      return (
        appointment.provider_Id === provider_Id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
    return appointments;
  }

  public async create({
    provider_Id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments | any> {
    const appointment = new Appointments();

    Object.assign(appointment, { id: nanoid(), date, provider_Id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
