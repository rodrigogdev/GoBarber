import { inject, injectable } from "tsyringe";
import { classToClass } from "class-transformer";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import Appointments from "../infra/typeorm/entities/Appointments";

interface IRequest {
  user_id: string;
}

@injectable()
class ListClientAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findAllFromClient(
      user_id
    );

    return classToClass(appointments);
  }
}

export default ListClientAppointmentService;
