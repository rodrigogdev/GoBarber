import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @Expose({ name: "avatar_url" })
  getavatar_url(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
