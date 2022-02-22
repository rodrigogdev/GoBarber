import { Response, Request } from "express";
import { container } from "tsyringe";

import RecoveryPasswordEmailService from "@modules/users/services/RecoveryPasswordEmailService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const recoveryPasswordEmailService = container.resolve(
      RecoveryPasswordEmailService
    );

    await recoveryPasswordEmailService.execute({ email });

    return response.status(204).json();
  }
}
