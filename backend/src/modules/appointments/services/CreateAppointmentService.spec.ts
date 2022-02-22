import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentRespository";
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to create a new appointment", async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_Id: "123123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_Id).toBe("123123123");
  });

  it("shouldn't be able to create two appointments in the same time", async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_Id: "123123123",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_Id: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
