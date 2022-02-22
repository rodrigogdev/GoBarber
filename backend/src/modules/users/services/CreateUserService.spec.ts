import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it("Should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("Shouldn't be able to create a user with an e-mail that already exists in user DB.", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
