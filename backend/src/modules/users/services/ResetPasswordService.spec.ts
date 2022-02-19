import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUsersTokensRepository from "../repositories/fakes/FakeUsersTokensRepository";
import ResetPasswordService from "./ResetPasswordService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider
    );
  });

  it("Should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const userToken = await fakeUsersTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPasswordService.execute({
      password: "123123",
      token: userToken.token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updateUser?.password).toBe("123123");
  });

  it("Shouldn't be able to reset password if a non-existing password", async () => {
    await expect(
      resetPasswordService.execute({
        token: "non-existing token",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Shouldn't be able to reset password if a non-existing user", async () => {
    const userToken = await fakeUsersTokensRepository.generate(
      "non-existing-user"
    );

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Shouldn't be able to reset password with a expired token (2 hours)", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const userToken = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: "123123",
        token: userToken.token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
