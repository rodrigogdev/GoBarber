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
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2022, 4, 10, 13),
      user_id: "user_id",
      provider_Id: "provider_id",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_Id).toBe("provider_id");
  });

  it("shouldn't be able to create two appointments in the same time", async () => {
    const appointmentDate = new Date(2022, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: "user_id",
      provider_Id: "provider_id",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: "user_id",
        provider_Id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 11),
        user_id: "user_id",
        provider_Id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 13),
        user_id: "user_id",
        provider_Id: "user_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create an appointment outside work hours (8am - 5pm)", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 7),
        user_id: "user_id",
        provider_Id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 18),
        user_id: "user_id",
        provider_Id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
