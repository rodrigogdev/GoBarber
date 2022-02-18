import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRespository";

interface IRequest {
  email: string;
}

@injectable()
class RecoveryPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError("User doesn't exist.");
    }
    this.mailProvider.sendMail(
      email,
      "Pedido de Recuperação de Senha recebido."
    );
  }
}

export default RecoveryPasswordEmailService;
