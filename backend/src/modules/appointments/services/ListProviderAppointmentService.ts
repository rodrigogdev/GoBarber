import { inject, injectable } from "tsyringe";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";
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
    private appointmentsRepository: IAppointmentsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_Id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointments[]> {
    const cacheKey = `provider-appointments:${provider_Id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointments[]>(
      cacheKey
    );
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_Id,
          year,
          month,
          day,
        }
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return classToClass(appointments);
  }
}

export default ListProviderAppointmentService;
