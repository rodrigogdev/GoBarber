import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import AuthenticateUserService from "./AuthenticateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("Should be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
      avatar: "picture.jpg",
      user_type: "client",
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123123123",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("Shouldn't be able to authenticate non existing user", async () => {
    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Shouldn't be able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
      avatar: "picture.jpg",
      user_type: "client",
    });

    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
