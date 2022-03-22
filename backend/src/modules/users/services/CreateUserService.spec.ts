import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
let fakeStorageProvider: FakeStorageProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
      fakeStorageProvider
    );
  });
  it("Should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
      avatarFileName: "picture.jpg",
      user_type: "client",
    });

    expect(user).toHaveProperty("id");
  });

  it("Shouldn't be able to create a user with an e-mail that already exists in user DB.", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
      avatarFileName: "picture.jpg",
      user_type: "client",
    });

    await expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123123123",
        avatarFileName: "picture.jpg",
        user_type: "client",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
