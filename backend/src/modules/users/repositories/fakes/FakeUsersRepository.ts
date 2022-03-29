import IUsersRepository from "@modules/users/repositories/IUsersRespository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import { nanoid } from "nanoid";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";
import { classToClass } from "class-transformer";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter((user) => user.id !== except_user_id);
    }
    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User | any> {
    const user = new User();

    Object.assign(user, { id: nanoid() }, userData);

    this.users.push(user);

    return classToClass(user);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
