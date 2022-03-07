import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IFindAllinMonthProviderDTO from "../dtos/IFindAllinMonthProviderDTO";
import IFindAllinDayProviderDTO from "../dtos/IFindAllinDayProviderDTO";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_Id: string): Promise<Appointment | undefined>;
  findAllInMonthProvider(
    data: IFindAllinMonthProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllinDayProviderDTO
  ): Promise<Appointment[]>;
}
