import { getRepository, Repository } from "typeorm";
import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

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

  public async create({
    provider_Id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments | any> {
    const appointment = this.ormRepository.create({ provider_Id, date });

    await this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
