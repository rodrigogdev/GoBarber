import { getHours, isBefore, startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";
import AppError from "../../../shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface Request {
  provider_Id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    date,
    provider_Id,
    user_id,
  }: Request): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("Can't create an appointment on a past date.");
    }

    if (user_id === provider_Id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can only create appointments between work hours (8am - 5pm)"
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_Id,
      user_id,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
