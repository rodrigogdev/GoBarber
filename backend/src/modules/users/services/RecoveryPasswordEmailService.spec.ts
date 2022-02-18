import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import RecoveryPasswordEmailService from "./RecoveryPasswordEmailService";

describe("SendRecoveryPasswordEmail", () => {
  it("Should be able to recover password using the email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendRecoveryPasswordEmail = new RecoveryPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await sendRecoveryPasswordEmail.execute({
      email: "johndoe@example.com",
    });

    expect(sendMail).toBeCalled();
  });

  it("Shouldn't be able to recover a non-existing user password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendRecoveryPasswordEmail = new RecoveryPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await expect(
      sendRecoveryPasswordEmail.execute({
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
