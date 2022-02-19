import { inject, injectable } from "tsyringe";
import { isAfter, addHours } from "date-fns";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRespository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token doesn't exists");
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User doesn't exists");
    }

    const tokenCreatedAt = userToken.created_At;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
