import { getRepository, Raw, Repository } from "typeorm";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllinMonthProviderDTO from "@modules/appointments/dtos/IFindAllinMonthProviderDTO";
import IFindAllinDayProviderDTO from "@modules/appointments/dtos/IFindAllinDayProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthProvider({
    provider_Id,
    month,
    year,
  }: IFindAllinMonthProviderDTO): Promise<Appointments[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_Id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_Id,
    day,
    month,
    year,
  }: IFindAllinDayProviderDTO): Promise<Appointments[]> {
    const parsedDay = String(day).padStart(2, "0");
    const parsedMonth = String(month).padStart(2, "0");
    const appointments = await this.ormRepository.find({
      where: {
        provider_Id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_Id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments | any> {
    const appointment = this.ormRepository.create({
      provider_Id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
