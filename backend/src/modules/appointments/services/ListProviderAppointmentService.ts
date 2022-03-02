import { inject, injectable } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import Appointments from "../infra/typeorm/entities/Appointments";

interface IRequest {
  provider_Id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_Id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointments[]> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_Id,
        year,
        month,
        day,
      });
    return appointments;
  }
}

export default ListProviderAppointmentService;
