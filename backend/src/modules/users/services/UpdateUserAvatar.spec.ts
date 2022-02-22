import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUSerAvatar: UpdateUserAvatarService;

describe("UpdateUSerAvatar", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });
  it("Should be able to upload avatar", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("Shouldn't be able to update avatar from a unexisting user", async () => {
    await expect(
      updateUSerAvatar.execute({
        user_id: "non-existing-user",
        avatarFileName: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should delete older avatar when updating", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFileName: "new-avatar.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");
    expect(user.avatar).toBe("new-avatar.jpg");
  });
});
