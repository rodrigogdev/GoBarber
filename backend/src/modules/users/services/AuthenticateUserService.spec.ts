import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("Should be able to authenticate", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
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
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
