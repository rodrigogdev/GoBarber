import { injectable, inject } from "tsyringe";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IUsersRepository from "../repositories/IUsersRespository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatarFileName: string;
  user_type: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,

    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    avatarFileName,
    user_type,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const avatar = await this.storageProvider.saveFile(avatarFileName);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      user_type,
    });

    await this.cacheProvider.invalidatePrefix("providers-list");

    return user;
  }
}

export default CreateUserService;
