import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRespository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

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
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {}
}

export default ResetPasswordService;
