import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Voucher } from "./Voucher";
import { Campaign } from "./Campaign";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column(() => Number)
  age: number;

  @Column()
  ip: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Voucher, (voucher) => voucher.usedBy)
  vouchers: Voucher[];

  @OneToMany(() => Campaign, (campaign) => campaign.createdBy)
  campaigns: Campaign[];
}
