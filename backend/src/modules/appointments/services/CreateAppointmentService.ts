import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";
import AppError from "../../../shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface Request {
  provider_Id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ date, provider_Id }: Request): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_Id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
