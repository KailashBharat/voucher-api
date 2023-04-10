import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Voucher } from "./Voucher";
import { User } from "./User";

@Entity()
export class Campaign extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Voucher, (voucher) => voucher.campaign)
  vouchers: Voucher[];

  @Column()
  description: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId:string

  @ManyToOne(() => User, (user) => user.campaigns)
  @JoinColumn({name: "userId"})
  createdBy: User;

  @Column({ default: null, nullable: true })
  endsAt: Date;
}
