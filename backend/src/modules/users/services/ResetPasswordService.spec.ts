import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUsersTokensRepository from "../repositories/fakes/FakeUsersTokensRepository";
import ResetPasswordService from "./ResetPasswordService";

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let resetPasswordService: ResetPasswordService;

describe("SendRecoveryPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository
    );
  });

  it("Should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const userToken = await fakeUsersTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: "123123",
      token: userToken.token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(updateUser?.password).toBe("123123");
  });
});
