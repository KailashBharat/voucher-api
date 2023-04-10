import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Voucher } from "./Voucher";
import { User } from "./User";

@Entity()
export class Campaign extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Voucher, (voucher) => voucher.campaign)
  vouchers: Voucher[];

  @Column()
  description: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.campaigns)
  createdBy: User;

  @Column({ default: null, nullable: true })
  endsAt: Date;
}
