import { uuid } from "uuidv4";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUserTokensRepository from "../IUserTokensRepository";

class FakeUsersTokensRepository implements IUserTokensRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_At: new Date(),
      updated_At: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      (findToken) => findToken.token === token
    );
    return userToken;
  }
}

export default FakeUsersTokensRepository;
