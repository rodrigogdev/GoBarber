import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("user_tokens")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}

export default UserToken;
