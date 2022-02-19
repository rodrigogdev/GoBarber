import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import User from "../../../../users/infra/typeorm/entities/User";

@Entity("appointments")
class Appointments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_Id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_Id" })
  provider: User;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}

export default Appointments;
