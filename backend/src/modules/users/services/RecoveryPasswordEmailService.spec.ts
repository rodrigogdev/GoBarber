import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUsersTokensRepository from "../repositories/fakes/FakeUsersTokensRepository";
import RecoveryPasswordEmailService from "./RecoveryPasswordEmailService";

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendRecoveryPasswordEmail: RecoveryPasswordEmailService;

describe("SendRecoveryPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    sendRecoveryPasswordEmail = new RecoveryPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository
    );
  });

  it("Should be able to recover password using the email", async () => {
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
    await expect(
      sendRecoveryPasswordEmail.execute({
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, "generate");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await sendRecoveryPasswordEmail.execute({
      email: "johndoe@example.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
