import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe("showProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it("should be able to show user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      avatar: "picture.jpg",
      user_type: "client",
    });

    const showdUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(showdUser.name).toBe("John Doe");
    expect(showdUser.email).toBe("johndoe@example.com");
  });

  it("should not be able to show with non existing user", async () => {
    expect(
      showProfile.execute({
        user_id: "non-existing-user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
