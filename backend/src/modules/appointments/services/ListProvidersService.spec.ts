import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it("Should be able to list the providers", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      avatar: "picture.jpg",
      user_type: "client",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Tre",
      email: "johntre@example.com",
      password: "123123",
      avatar: "picture.jpg",
      user_type: "client",
    });

    const loggedUser = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@example.com",
      password: "123321",
      avatar: "picture.jpg",
      user_type: "client",
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
