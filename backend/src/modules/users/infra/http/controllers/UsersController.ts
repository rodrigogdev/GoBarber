import CreateUserService from "@modules/users/services/CreateUserService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, user_type } = request.body;

    const createUser = container.resolve(CreateUserService);
    const avatarFileName = request.file.filename;

    const user = await createUser.execute({
      name,
      email,
      password,
      avatarFileName,
      user_type,
    });

    return response.json(classToClass(user));
  }
}
